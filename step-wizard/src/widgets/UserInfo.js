import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        paddingTop:"10px"
    },
    t: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
export const UserInfo = (props) => {
    const classes = useStyles();
    const userInfo = props.userInfo;
    const boughtDate = new Date(userInfo["boughtDate"]._d).toLocaleDateString();
    const lastDate = new Date(userInfo["lastDate"]._d).toLocaleDateString();
    return <Grid item xs={6}>
        <Card className={classes.root}>
            <CardContent>
                <Typography >
                    Customer Name : {userInfo["customerName"]}
                </Typography>
                <Typography>
                    email-Id  : {userInfo["email"]}
                </Typography>
                <Typography>
                    mobile No.  : {userInfo["mobileNo"]}
                </Typography>

                <Typography>
                    Vehicle No  : {userInfo["vehicleNo"]}
                </Typography>
                <Typography>
                    Model  : {userInfo["model"]}
                </Typography>
                <Typography>
                    variant  : {userInfo["variant"]}
                </Typography>
                <Typography>
                    Price  : {userInfo["price"]}
                </Typography>
                <Typography>
                    Bought Date  : {boughtDate}
                </Typography>
                <Typography>
                    Last Date  : {lastDate}
                </Typography>
            </CardContent>
        </Card >
    </Grid>

}