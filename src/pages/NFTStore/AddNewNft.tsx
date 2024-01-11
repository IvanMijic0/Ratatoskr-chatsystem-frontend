import React, { useState } from 'react';
import * as fs from "fs";

function AddNewNft() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [externalUrl, setExternalUrl] = useState('');

    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleExternalUrlChange = (e) => setExternalUrl(e.target.value);
    // const uploadImage = async (file) => {
    //     try {
    //         const data = new FormData()
    //         data.append("file", fs.createReadStream(file))
    //         data.append("pinataMetadata", '{"name": "pinnie"}')
    //
    //         const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${process.env.PINATA_JWT}`
    //             },
    //             body: data
    //         })
    //         resData = await res.json()
    //         console.log("File uploaded, CID:", resData.IpfsHash)
    //         return resData.IpfsHash
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const handleSubmit = async () => {
        // Implement the logic to upload file and metadata using Pinata
        // You'll need to use fetch API to make requests to Pinata
        // Refer to the provided Node.js code structure for guidance
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
            <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />
            <input type="text" value={externalUrl} onChange={handleExternalUrlChange} placeholder="External URL" />
            <button onClick={handleSubmit}>Upload NFT</button>
        </div>
    );
}

export default AddNewNft;
