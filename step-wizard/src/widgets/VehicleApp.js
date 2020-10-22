import React, { useState } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import { UserInfo } from "./UserInfo"


import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
const steps = [
    {
        stepId: 0, stepName: "vehicle details",
    },
    {
        stepId: 1, stepName: "OTP Verification",
    },
    {
        stepId: 2, stepName: "Vehicle Details",
    },
    {
        stepId: 3, stepName: "Vehicle Duration",
    },
]

export class VehicleApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            stepProgress: 0,
            totalStep: Object.keys(steps).length,
            formData: {}
        }
        this.onNextStepClick = this.onNextStepClick.bind(this);
        this.onUpdateFormData = this.onUpdateFormData.bind(this);
        this.onUpdateRecord = this.onUpdateRecord.bind(this)
    }

    onUpdateRecord = (data) => {
        this.setState({ currentFormRecord: data })
    }
    onNextStepClick = (data) => {
        this.setState({ currentStep: this.state.currentStep + 1, stepProgress: this.state.stepProgress + 25, formData: { ...this.state.formData, ...data } })
    }
    onUpdateFormData = (data) => {
        this.setState({ record: data })
    }
    renderForms = () => {
        const { currentStep } = this.state;
        switch (currentStep) {
            case 0:
                return <CustomerForm currentStep={currentStep} formData={this.state.formData} onNextStepClick={this.onNextStepClick.bind(this)} formSchema={steps[currentStep]} />
            case 1:
                return <OTPForm currentStep={currentStep} formData={this.state.formData} onNextStepClick={this.onNextStepClick.bind(this)} formSchema={steps[currentStep]} />
            case 2:
                return <VehicleForm currentStep={currentStep} formData={this.state.formData} onNextStepClick={this.onNextStepClick.bind(this)} formSchema={steps[currentStep]} />
            case 3:
                return <DetailForm currentStep={currentStep} formData={this.state.formData} onNextStepClick={this.onNextStepClick.bind(this)} formSchema={steps[currentStep]} />
            default:
                return <UserInfo userInfo={this.state.formData} />
        }
    }
    render() {
        return <div style={{ margin: "5px", border: "5px", padding: "10px" }}>

            <h3>{`${this.state.currentStep} of  ${this.state.totalStep} Completed`}</h3>
            <LinearProgress variant="determinate" value={this.state.stepProgress} valueBuffer={100} />
            <Grid Container justify="center">
                {this.renderForms()}
            </Grid>
        </div>

    }
}


const CustomerForm = (props) => {
    const { formSchema } = props;
    const [custName, setCustName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState();
    // const [fieldValue, setFieldValue] = useState("");
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    const updateRecord = () => {
        const data = {
            customerName: custName,
            email,
            mobileNo,
        }
        props.onNextStepClick(data)
    }
    return <div>
        <TextField className="input-field" id="customerName" placeholder="Enter Customer Name" type="text" value={custName} onChange={(e) => setCustName(e.target.value)} label="Customer Name" variant="outlined" /><br />
        <TextField className="input-field" id="email" placeholder="Enter email Name" type="email" value={email} onChange={(e) => {
            setEmail(e.target.value)
        }}
            error={email === "" ? false : validateEmail(email) ? false : true}
            label="Email" variant="outlined" /><br />

        <TextField className="input-field" id="mobileNo" placeholder="Enter mobile No" type="number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} label="Mobile No." variant="outlined" /><br />
        <Button onClick={updateRecord} color="primary">Next</Button>
    </div>

}

const OTPForm = (props) => {
    const { formSchema } = props;
    const [otp, setOtp] = useState("");
    const updateRecord = () => {
        const data = {
            Otp: otp,
        }
        props.onNextStepClick(data)
    }
    return <div><h3>{`OTP has been sent to registered phone No ${props.formData.mobileNo}`} </h3>
        <TextField id="Otp" placeholder="Enter OTP sent to you mobile no" type="number" value={otp} onChange={(e) => setOtp(e.target.value)} label="Enter OTP" variant="outlined" /><br />
        <Button onClick={updateRecord} color="primary">Next</Button>
    </div>

}

const VehicleForm = (props) => {
    const { formSchema } = props;
    const [vehicleNo, setVehicleNo] = useState("");

    const [model, setModel] = useState("");
    const [variant, setVariant] = useState("");
    const [manufacturingYear, setManufacturingYear] = useState("");
    const [price, setPrice] = useState();

    const updateRecord = () => {
        const data = {
            vehicleNo,
            model, variant, manufacturingYear, price
        }
        props.onNextStepClick(data)
    }
    return <div>
        <TextField className="input-field" id="Vehicle No" placeholder="Enter Vehicle No" type="text" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} label="Customer Name" variant="outlined" /><br />
        <TextField className="input-field" id="Model" placeholder="Enter model Name" type="email" value={model} onChange={(e) => { setModel(e.target.value) }} label="Model" variant="outlined" /><br />
        <TextField className="input-field" id="Variant Type" placeholder="Enter Varient Type" type="text" value={variant} onChange={(e) => setVariant(e.target.value)} label="Variant" variant="outlined" /><br />
        <TextField className="input-field" id="Manufacturing Year" placeholder="Enter Manufacturing Year" type="number" value={manufacturingYear} onChange={(e) => setManufacturingYear(e.target.value)} label="Mobile No." variant="outlined" /><br />
        <TextField className="input-field" id="Price" placeholder="Enter mobile No" type="number" value={price} onChange={(e) => setPrice(e.target.value)} label="Price" variant="outlined" /><br />
        <Button onClick={updateRecord} color="primary">Next</Button>

    </div>

}

const DetailForm = (props) => {
    const { formSchema } = props;
    const [boughtDate, setBoughtDate] = useState("");
    const [lastDate, setLastDate] = useState("");
    const updateRecord = () => {
        const data = {
            boughtDate,
            lastDate
        }
        props.onNextStepClick(data)
    }

    return <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDatePicker
                margin="normal"

                id="boughtDate"
                label=" Select Bought Date"
                format="MM/dd/yyyy"
                value={boughtDate ? boughtDate : new Date()}
                onChange={setBoughtDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            /><br />
            <KeyboardDatePicker
                margin="normal"
                id="lastDate"
                label=" Select Last Date"
                format="MM/dd/yyyy"
                value={lastDate ? lastDate : new Date()}
                onChange={setLastDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            /><br />
            <Button onClick={updateRecord} color="primary">Next</Button>

        </MuiPickersUtilsProvider>



    </div>

}