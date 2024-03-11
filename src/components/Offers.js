import { useState } from "react"
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MyRadioButtonGrid from "./MyRadioButtonGrid";
export default function Offers() {
  const [items] = useState([])

const columns = [
  { field: 'fileName', headerName: 'File Name', flex: 0.3, headerClassName: 'custom-header' },
  { field: 'status', headerName: 'Status', flex: 0.2, headerClassName: 'custom-header' },
  { field: 'approvedBy', headerName: 'Approved By', flex: 0.2, headerClassName: 'custom-header' },
  { field: 'approvedAt', headerName: 'Approved At', flex: 0.2, headerClassName: 'custom-header' },
  { field: 'timeStarted', headerName: 'Time Started', flex: 0.2, headerClassName: 'custom-header' },
  { field: 'actions', headerName: 'Actions', flex: 0.2, headerClassName: 'custom-header' },
];

  return (
    <div>
    <MyRadioButtonGrid/>
    <h3>Latest Offers</h3>
      
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ height: '100%', width: '80%' }}>
      <DataGrid
        rows={items}
        columns={columns}
        pageSizeOptions={[10, 20, 30, 50, 100]}
      />
      </div>
    </Box>
    
    </div>
  )
}