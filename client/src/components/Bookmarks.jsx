import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    heading: {
        fontSize: '30px',
        margin: 'auto',
    },
});

const Bookmark = () => {
    const classes = useStyles();

    return (
        <Typography className={classes.heading}>
            Your Bookmarked Barks
        </Typography>
    );
};

export default Bookmark;
