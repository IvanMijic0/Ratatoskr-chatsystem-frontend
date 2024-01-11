import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from "ethers";

interface Attribute {
    trait_type: string;
    value: string | number;
}

interface Props {
    contract: any;
    account: string;
}

const initialAttributes: Attribute[] = [
    { trait_type: "Type", value: "" },
    { trait_type: "Element", value: "" },
    { trait_type: "Rarity", value: "" },
    { trait_type: "Level", value: "" },
    { trait_type: "HP", value: "" },
    { trait_type: "Attack", value: "" },
    { trait_type: "Defense", value: "" },
    { trait_type: "Special Ability", value: "" },
    { trait_type: "Generation", value: "" },
    { trait_type: "Owner", value: "" },
];


const AddNewNft: React.FC<Props> = ({ contract, account }) => {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const [externalUrl, setExternalUrl] = useState('');
    const [attributes, setAttributes] = useState<Attribute[]>(initialAttributes);
    const [NFTprice, setNFTprice] = useState(0);


    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0]);
        }
    };

    const handleAttributeChange = (index: number, value: string) => {
        const newAttributes = [...attributes];
        newAttributes[index].value = value;
        setAttributes(newAttributes);
    };

    const pinFileToIPFS = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_PINATA_JWT}`,
            },
        });
        console.log('pinFileToIPFS response', response)
        return response.data.IpfsHash; // This is the CID of the file
    };

    const pinJSONToIPFS = async (metadata: object): Promise<string> => {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_PINATA_JWT}`,
            },
        });
        console.log('pinJSONToIPFS response', response)

        return response.data.IpfsHash; // This is the CID of the metadata
    };

    const mintNFT = async (metadataCID: string) => {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const [currentAccount] = await window.ethereum.request({ method: 'eth_accounts' });

        // Convert attributes to the format required by the contract
        const formattedAttributes = attributes.map(attr => [attr.trait_type, attr.value.toString()]);

        // Construct the transaction
        const transaction = await contract.mintNFT(
            name,
            description,
            `ipfs://${metadataCID}`,
            formattedAttributes, // Use the formatted attributes here
            1, // Additional parameter
            { from: currentAccount }
        );

        // Wait for the transaction to be mined
        await transaction.wait();
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file && name && description && attributes) {
            try {
                // First, pin the file to IPFS
                const imageCID = await pinFileToIPFS(file);
                console.log('imageCID', imageCID)
                // Then, construct the metadata with the image CID and attributes
                const metadata = {
                    name: name,
                    description: description,
                    image: `ipfs://${imageCID}`,  // TODO add format of the file mb
                    // external_url: externalUrl,
                    attributes: attributes,
                };
                console.log('metadata', metadata)

                const metadataCID = await pinJSONToIPFS(metadata);
                console.log('metadataCID', metadataCID)
                await mintNFT(metadataCID);
                alert('NFT minted successfully!');
            } catch (error) {
                console.error('Error minting NFT:', error);
                alert('Error minting NFT.');
            }
        } else {
            alert('All fields are required.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"
                      required/>
            {/*<input type="text" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="External URL" required />*/}
            {attributes.map((attribute, index) => (
                <div key={attribute.trait_type}>
                    <label>{'Monster ' + attribute.trait_type}</label>
                    <input
                        type={attribute.trait_type === "Level" ? "number" : "text"} // Use "number" type for numeric values
                        value={attribute.value.toString()}
                        onChange={(e) => handleAttributeChange(index, e.target.value)}
                        placeholder={attribute.trait_type}
                        required
                    />
                </div>
            ))}
            <input type="number" value={NFTprice} onChange={(e) => setNFTprice(Number(e.target.value))} placeholder="Price" required/>
            <input type="file" onChange={onFileChange} required/>
            <button type="submit">Mint NFT</button>
        </form>
    );
};

export default AddNewNft;
