import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { formatDistanceToNow } from 'date-fns';
import Mnue from './Mnue';
import { useLogedInUser } from '../Context/logedInUser';

export default function PostShow({ post, userName, postImg, postDate, postEmail, postId }) {
    const { loggedInUser } = useLogedInUser();

    console.log("Logged in user:", loggedInUser.email);
    console.log("Post ID:", postId);
    console.log("Post content:", post);

    return (
        <Box sx={{ minHeight: 350 }}>
            <Card
                variant="outlined"
                sx={(theme) => ({
                    width: {
                        xs: '350px',    // For small screens, make it 100% width
                        sm: '450px',   // For medium screens (600px and above), make it 450px
                        md: '550px',   // For larger screens (900px and above), make it 550px
                      },
                    maxWidth: '100%',  
                    gridColumn: 'span 2',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    resize: 'horizontal',
                    overflow: 'hidden',
                    gap: 'clamp(0px, (100% - 500px + 32px) * 999, 16px)',  
                    transition: 'transform 0.3s, border 0.3s',
                    '&:hover': {
                        borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                        transform: 'translateY(-2px)',
                    },
                    '& > *': { minWidth: 'clamp(0px, (550px - 100%) * 999, 100%)' },  // Adjusted for new width
                })}
            >
                <AspectRatio
                    variant="soft"
                    sx={{
                        flexGrow: 1,
                        display: 'contents',
                        '--AspectRatio-paddingBottom':
                            'clamp(0px, (100% - 550px) * 999, min(calc(100% / (16 / 9)), 300px))',  // Adjust for 450px width
                    }}
                >
                    <img
                        src={postImg}
                        loading="lazy"
                        alt=""
                        style={{ width: '100%' }}  // Ensure image scales with card width
                    />
                </AspectRatio>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 250 }}>
                    <Box sx={{ display: 'flex' }}>
                        <div>
                            <Typography level="title-lg">
                                <Link
                                    href="#container-responsive"
                                    overlay
                                    underline="none"
                                    sx={{
                                        color: 'text.primary',
                                        '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                                    }}
                                >
                                    {userName}
                                </Link>
                            </Typography>
                            <Typography level="body-sm">
                                {formatDistanceToNow(new Date(postDate), { addSuffix: true })}
                            </Typography>
                        </div>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: 'auto', alignSelf: 'flex-start' }}
                        >
                            <FavoriteBorderRoundedIcon color="danger" />
                        </IconButton>
                    </Box>
                    <AspectRatio
                        variant="soft"
                        sx={{
                            '--AspectRatio-paddingBottom':
                                'clamp(0px, (100% - 250px) * 999, 250px)',  // Adjust this padding for image size
                            pointerEvents: 'none',
                        }}
                    >
                        <img
                            alt=""
                            src={postImg}
                            style={{ width: '100%' }}  // Make sure the image adapts to the card width
                        />
                    </AspectRatio>
                    <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                        <div>
                            <Typography level="body-sm">{post}</Typography>
                        </div>
                        <div>
                            {loggedInUser && loggedInUser.email === postEmail && (
                                <div style={{ position: 'fixed', right: '0', bottom: '3px' }}>
                                    <Mnue postId={postId} />
                                </div>
                            )}
                        </div>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
