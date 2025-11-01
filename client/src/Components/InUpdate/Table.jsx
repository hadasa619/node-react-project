import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Table(props) {
    const [sizes, setSizes] = useState([]);


    useEffect(() => {
        console.log(props);      
        setSizes(props.sizes)
    }, []);

    return (
        <div className="card">
            <DataTable value={sizes} scrollable scrollHeight="150px" style={{ width: '8rem', height:"150px", fontSize:"12px" }}>
                <Column field="option" header="Size"></Column>
                <Column field="price" header="Price"></Column>
            </DataTable>
        </div>
    );
}