import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import Row from "../components/Row";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ButtonBar from "../components/ButtonBar";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Directory()
{
    const [colDefaults] = useState({resizeable: true, minWidth: 90});
    const [colResizeDefault] = useState('shift');
    const [columns] = useState([
        {headerName: "Picture", field: "image", width: 90, suppressSizeToFit: true,
            cellRenderer: function(params) {
                return `<img src=${params.value} alt="random person" />`;
            }
        },
        {headerName: "Name", field: "name", sortable: true, filter: true, width: 225},
        {headerName: "Email", field: "email", sortable: true, filter: true, width: 300},
        {headerName: "Phone", field: "phone", sortable: true, filter: true, minWidth: 150, width: 150, suppressSizeToFit: true}, // cell first
        {headerName: "Age", field: "age", sortable: true, filter: true, width: 90, suppressSizeToFit: true}
    ]);
    const [users, setUsers] = useState([]);
    const [gridAPI, setGridAPI] = useState();
    const [gridColumnAPI, setGridColumnAPI] = useState();

    function loadUsers() 
    {
        API.getUsers()
            .then(users => {
                setUsers(users);
            })
            .catch(err => console.log(err));
    }

    const onFirstDataRendered = () => {
        sizeToFit();
    };

    const onGridReady = params => {
        setGridAPI(params.api);
        setGridColumnAPI(params.columnApi);
    };

    const sizeToFit = () => {
        gridAPI.sizeColumnsToFit();
    };

    const autoSizeAll = skipHeader => {
        var allColumnIds = [];
        gridColumnAPI.getAllColumns().forEach(function(column) {
          allColumnIds.push(column.colId);
        });
        gridColumnAPI.autoSizeColumns(allColumnIds, skipHeader);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <Container>
            <Header />
            <ButtonBar sizeToFit={sizeToFit} autoSizeAll={autoSizeAll} />
            <Row
                className="ag-theme-alpine"
                style={{
                    height: '500px',
                    minWidth: '350px',
                    width: '100%' 
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={users}
                    defaultColDef={colDefaults}
                    colResizeDefault={colResizeDefault}
                    onFirstDataRendered={onFirstDataRendered}
                    onGridReady={onGridReady}
                >
                </AgGridReact>
            </Row>

            <Footer />
        </Container>
        
    );
}

export default Directory;
