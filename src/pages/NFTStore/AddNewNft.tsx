import React, { useState } from 'react';
import axios from 'axios';
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Attribute {
    trait_type: string;
    value: string | number;
}

interface Props {
    contract: any;
    account: string;
    open: boolean;
    handleClose: () => void;
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

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};


const AddNewNft: React.FC<Props> = ({ contract, account, handleClose }) => {
    // const jwtImport = import.meta.env.VITE_REACT_APP_API_PINATA_JWT as string;
    // console.log(jwtImport)

    const [jwt] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0YTMxOGU2MS1jMmFmLTQyMWItOGI0Yi1kNDNmMTA5NzIzYWIiLCJlbWFpbCI6ImJhcmFub3YuYS42NDEwM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWI4NjljNmZjN2RkZmRkZjgyOGUiLCJzY29wZWRLZXlTZWNyZXQiOiJjMTU4OTZiNzkwMDhlNDc4YTI1ZjYzOTNkOGUzZGFhYTM2ZTFiMTY5MDMzNzk5MjIyY2JiMzE0ZTUxNjhjNmNiIiwiaWF0IjoxNzA1MDEwOTA3fQ.OyQEPo0sGPN0lmsvAPEXQbAvRfk_pebIzg6zTC48AoY')
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [attributes, setAttributes] = useState<Attribute[]>(initialAttributes);
    // const [NFTprice, setNFTprice] = useState(0);
    // console.log('NFTprice', NFTprice);


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
        console.log('jwt', jwt)

        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('pinFileToIPFS response', response)
        return response.data.IpfsHash;
    };

    const pinJSONToIPFS = async (metadata: object): Promise<string> => {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });
        console.log('pinJSONToIPFS response', response)

        return response.data.IpfsHash;
    };

    const mintNFT = async (imgCID: string) => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const [currentAccount] = await window.ethereum.request({ method: 'eth_accounts' });

        const formattedAttributes = attributes.map(attr => [attr.trait_type, attr.value.toString()]);

        // Construct the transaction
        const transaction = await contract.mintNFT(
            name,
            description,
            `ipfs://${imgCID}`,
            formattedAttributes,
            // numberOfMonsterTokens,
            { from: currentAccount }
        );

        await transaction.wait();
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file && name && description && attributes) {
            try {
                console.log('jwt', jwt)
                const imageCID = await pinFileToIPFS(file);
                console.log('Image CID:', imageCID);

                const metadata = {
                    name: name,
                    description: description,
                    image: `ipfs://${imageCID}`,
                    attributes: attributes,
                    // price: NFTprice
                };
                console.log('Metadata before pinning:', metadata);

                const metadataCID = await pinJSONToIPFS(metadata);
                console.log('Metadata CID:', metadataCID);

                await mintNFT(imageCID);
                alert('NFT minted successfully!');
                handleClose()
            } catch (error) {
                console.error('Error minting NFT:', error);
                alert('Error minting NFT.');
            }
        } else {
            alert('All fields are required.');
        }
    };

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Mint New NFT
            </Typography>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={{flexBasis: 'calc(50% - 20px)'}}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        sx={{flexBasis: '100%'}} // Description takes full width
                    />
                    {attributes.map((attribute, index) => (
                        <TextField
                            key={attribute.trait_type}
                            label={'Monster ' + attribute.trait_type}
                            variant="outlined"
                            type={attribute.trait_type === "Level" ? "number" : "text"}
                            value={attribute.value.toString()}
                            onChange={(e) => handleAttributeChange(index, e.target.value)}
                            required
                            sx={{flexBasis: 'calc(50% - 20px)'}}
                        />
                    ))}
                    {/*<TextField*/}
                    {/*    label="Price"*/}
                    {/*    variant="outlined"*/}
                    {/*    type="number"*/}
                    {/*    value={NFTprice}*/}
                    {/*    onChange={(e) => setNFTprice(Number(e.target.value))}*/}
                    {/*    required*/}
                    {/*    sx={{flexBasis: 'calc(50% - 20px)'}}*/}
                    {/*/>*/}
                    <Box sx={{flexBasis: 'calc(50% - 20px)', display: 'flex', alignItems: 'center'}}>
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={onFileChange}
                        />
                        <label htmlFor="raised-button-file" style={{width: '100%'}}>
                            <Button variant="contained" component="span" fullWidth startIcon={<CloudUploadIcon />}>
                                Upload File
                            </Button>
                        </label>
                    </Box>
                </Box>
                <Button variant="contained" type="submit" fullWidth>
                    Mint NFT
                </Button>
            </form>
            <Button onClick={handleClose}>Close</Button>
        </Box>
        </Modal>
    );
};

export default AddNewNft;
