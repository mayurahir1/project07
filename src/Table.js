
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';



export default function Table() {
    const [data, setData] = useState([]);

    const Navigate = useNavigate()

    const columns = [
        {
            name: "firstName",
            label: "firstName",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "lastName",
            label: "lastName",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email",
            label: "email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "password",
            label: "password",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id",
            label: "id",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id",
            label: "edit",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Button variant="contained" color="success" onClick={() => handleEditItem(value)} > Edit   </Button>
                )

            }
        },
        {
            name: "delete",
            label: "delete",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Button variant="outlined" color="error" onClick={() => handleRemoveItem(tableMeta.rowData[4])} > Delete   </Button>
                )
            }
        },
    ];

    const options = {
        filterType: "checkbox",
    };

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })

    // const handleEditItem = (value) => {
    //     let newData = JSON.parse(localStorage.getItem('formData'))
    //     console.log(newData)

    //     let objIndex = data.findIndex((obj => obj.id == value))
    //     console.log(objIndex)
    //     Navigate('/')
    // }

    const handleEditItem = (value) => {
        const selectedRowData = data.find((item) => item.id === value);
        localStorage.setItem("selectedRowData", JSON.stringify(selectedRowData));
        Navigate("/Signup");
    };



    const handleRemoveItem = (id) => {
        console.log(id)
        const mk = data.filter((item) => item.id !== id)
        setData(mk)
        localStorage.setItem("formData", JSON.stringify(mk));
    }

    useEffect(() => {



        const getDataFromLocalStorage = () => {
            const formDataString = localStorage.getItem("formData");
            if (formDataString) {
                try {
                    const formData = JSON.parse(formDataString);
                    setData(formData);
                } catch (error) {
                    console.error("Error parsing data from localStorage:", error);
                }
            }
        };

        getDataFromLocalStorage();
    }, []);

    return (
        <div style={{ overflowX: "auto" }}>

            <CacheProvider value={muiCache}>
                <ThemeProvider theme={createTheme()}>
                    <MUIDataTable
                        title={"Employee List"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </ThemeProvider>
            </CacheProvider>
            <h3 >
                <a href="/" style={{ marginLeft: "50px" }}>Add Data</a>
            </h3>
        </div>
    );
};
