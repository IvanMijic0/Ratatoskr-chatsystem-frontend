import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
        name: string;
        description: string;
        image: string;
        attributes: {
            trait_type: string;
            value: string;
        }[];
    };
}

function NFTShopCard({ nft }: NFTStoreCardProps) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="nft">
                        {nft.name[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={nft.name}
                subheader={`Generation: ${nft.attributes.find(
                    (attr) => attr.trait_type === 'Generation'
                )?.value}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={nft.image}
                alt={nft.name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {nft.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                />
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
