import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "./api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";
const axioss = require("axios");
export default function AddEdit() {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // eventEmitter.emit('loading', true);

    async function fetch() {
      axios
        .getCustomerById(params.id)
        .then((res) => {
          setName(res.data.name);
          setAdress(res.data.adress);
          setMobile(res.data.mobile);
        })
        .catch((err) => {
          // eventEmitter.emit('loading', false)
        });
    }
    if (location.pathname != "/add") fetch();
  }, []);

  const save = () => {
    let data = { name: name, adress: adress, mobile: mobile };
    if (!name || !adress || !mobile) {
      setError("All Fields are required");
    } else {
      // valdition number
      axioss
        .get(
          `https://phonevalidation.abstractapi.com/v1/?api_key=4f800f970bb54314bdce01ba212dfd8e&phone=${mobile}`
        )
        .then((res) => {
          if (!res.data.valid) {
            setError("Your Mobile Number is Invalid");
          } else {
            let response={countryCode:res.data.country.prefix,countryName:res.data.country.name,operatorName:res.data.carrier}
            console.log("Number info",response)
            if (location.pathname == "/add") {
              axios
                .add(data)
                .then((res) => {
                  if (res.data) navigate("/");
                })
                .catch((err) => {
                  // eventEmitter.emit('loading', false)
                });
            } else {
              axios
                .update(params.id,data)
                .then((res) => {
                  if (res.data) navigate("/");
                })
                .catch((err) => {
                  // eventEmitter.emit('loading', false)
                });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container add-edit">
      <div className="">
        {error !== "" ? <div className="">{error}</div> : ""}
        <div>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            className="mt-20"
            label="Adress"
            value={adress}
            onChange={(e) => {
              setAdress(e.target.value);
            }}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            className="mt-20"
            label="Mobile"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            variant="outlined"
          />
        </div>
        <div className="mt-20">
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/')
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              save();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
