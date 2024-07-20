import { SimpleTreeView, TreeItem } from "@mui/x-tree-view"
import { Grid, Stack } from "@mui/material"
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


function App() {
  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'Hello', col2: 'World' },
    { id: 5, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 6, col1: 'MUI', col2: 'is Amazing' },
    { id: 7, col1: 'Hello', col2: 'World' },
    { id: 8, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 9, col1: 'MUI', col2: 'is Amazing' },
    { id: 10, col1: 'Hello', col2: 'World' },
    { id: 11, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 12, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  return (
    <Stack direction="column" sx={{ "height": "100vh" }}>
      <Grid container flexGrow={1} padding={2} alignItems={"stretch"}>
        <Grid item xs={2} paddingRight={2}>
          <SimpleTreeView sx={{"height": "100%"}}>
            <TreeItem itemId="hello" label="Electrical Components">
              <TreeItem itemId="hello-sub-1" label="Passives">
                <TreeItem itemId="hello-sub-1-1" label="Resistors" />
                <TreeItem itemId="hello-sub-1-2" label="Capactiors" />
                <TreeItem itemId="hello-sub-1-3" label="Inductors" />
              </TreeItem>
              <TreeItem itemId="hello-sub-2" label="ICs" />
              <TreeItem itemId="hello-sub-3" label="DCDC Modules" />
            </TreeItem>
            <TreeItem itemId="mech" label="Mechanical Components">
              <TreeItem itemId="mech-sub-1" label="Fasteners" />
              <TreeItem itemId="mech-sub-2" label="Raw Materials" />
              <TreeItem itemId="mech-sub-3" label="Filament" />
            </TreeItem>
          </SimpleTreeView>

        </Grid>
        <Grid item xs={10}>
          <DataGrid sx={{"height": "100%"}} rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default App
