import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
    onClick: () => void;
    'aria-expanded': boolean;
}

function ExpandMore(props: ExpandMoreProps) {
    const { expand, onClick, 'aria-expanded': ariaExpanded } = props;
    return (
        <IconButton
            onClick={onClick}
            aria-expanded={ariaExpanded}
            aria-label="show more"
        >
            <ExpandMoreIcon transform={expand ? 'rotate(180deg)' : undefined} />
        </IconButton>
    );
}

interface NFTStoreCardProps {
    nft: {
        id: number;
        price: number;
        name: string;
        description: string;
        image: string;
        attributes: {
            trait_type: string;
            value: string;
        }[];
    };
}

function convertIpfsUriToUrl(ipfsUri: string) {
    if (!ipfsUri) {
        return '';
    }
    const gatewayPrefix = 'https://ipfs.io/ipfs/';
    return ipfsUri.replace(/^ipfs:\/\//, gatewayPrefix);
}
interface NFTStoreCardProps {
    contract: any;
    account: string;
    tokenContract: any;
    nft: {
        id: number;
        price: number;
        name: string;
        description: string;
        image: string;
        attributes: {
            trait_type: string;
            value: string;
        }[];
    };
}
function NFTShopCard({ contract, account, tokenContract, nft }: NFTStoreCardProps){
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = async () => {
        setExpanded(!expanded);
    };

    const buyNFT = async (id) => {
        console.log('buy func account ', account)
        console.log('buy func nft.price ', nft.price)
        try {
            const transaction = await contract.buyNFT(id, {
                from: account,
                value: nft.price,
            });
            const res = await transaction.wait();
            console.log('buy func ', res)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Card sx={{ maxWidth: 345, minWidth: 300, minHeight: 300 }}>
            <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={convertIpfsUriToUrl(nft.image)}
                title={nft.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {nft.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {nft.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button size="small" onClick={() => buyNFT(nft.id)}>Buy NFT for {nft.price}</Button>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Attributes:</Typography>
                    <ul>
                        {nft.attributes.map((attr, index) => (
                            <li key={index}>
                                <strong>{attr.trait_type}:</strong> {attr.value}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default NFTShopCard;
