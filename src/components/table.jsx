// table.js
import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './table.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';

function Table(props) {
    const data = props.data;
    const anim = {
        init: {
            opacity: 0
        },
        ani: {
            opacity: 1,
            transition: {
                delay: 0.1,
                when: 'AfterChildren'
            }
        },
        exit: {
            y: -200,
        }
    }
    const childanim = {
        init: {
            opacity: 0
        },
        ani: {
            opacity: 1,
        }
    }

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Table Data', 14, 16);
        const tableColumn = ["Name", "ID", "Year", "Place", "Center", "Treatment Period", "Reason"];
        const tableRows = [];

        data.forEach(item => {
            const treatmentPeriod = `${item.tperiod_value} ${item.tperiod_unit}`;
            const reason = item.reason === 'others' ? item.otherReason : item.reason;
            const tableRow = [item.name, item.id, item.year, item.place, item.center, treatmentPeriod, reason];
            tableRows.push(tableRow);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });

        // Generate the PDF as a Blob
        const pdfBlob = doc.output('blob');
        
        // Create a Blob URL
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab
        window.open(pdfUrl, '_blank');
    };

    return (
        <div>
            <table className="styled-table" id="table-to-xls">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Year</th>
                        <th>Place</th>
                        <th>Center</th>
                        <th>Treatment Period</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <AnimatePresence>
                    <tbody id="tb">
                        {data.map((item, index) => (
                            <motion.tr key={index} variants={anim} initial='init' animate='ani' exit='exit'>
                                <motion.td variants={childanim} initial='init' animate='ani'>{item.name}</motion.td>
                                <td>{item.id}</td>
                                <td>{item.year}</td>
                                <td>{item.place}</td>
                                <td>{item.center}</td>
                                <td>{`${item.tperiod_value} ${item.tperiod_unit}`}</td>
                                <td>{item.reason === 'others' ? item.otherReason : item.reason}</td>
                                <td>{/* Add your action component or content here */}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </AnimatePresence>
            </table>
            <button onClick={exportToPDF} className="button-71">Export to PDF</button>
            <ReactHTMLTableToExcel
                id="export-excel"
                className="button-71"
                table="table-to-xls"
                filename="table"
                sheet="tabledata"
                buttonText="Export to Excel"
            />
        </div>
    );
}

export default Table;
