import React, {ReactNode} from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import {useGameStateContext} from "../GameSimulator/Context";
import DataTable from 'react-data-table-component';

function TabPanel(props: {
  children: ReactNode,
  index: any,
  value: any,
}) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function AnalyzeDialogueContent() {
  const { gameState } = useGameStateContext();
  const [value, setValue] = React.useState(0);

  // @ts-ignore
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let armies = Object.values(gameState.armyLookup);
  return <>
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Armies" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      <DataTable columns={[
        { name: "Id", selector: "id", sortable: true },
        { name: "Current Node", selector: "current_node.id", sortable: true },
        { name: "Planned path", selector: "planned_path", cell: row => <pre>{JSON.stringify(row.planned_path)}</pre>},
        { name: "Planned node id", selector: "planned_node_id", sortable: true },
        { name: "Progress", selector: "progress", },
        { name: "Raw data", cell: row => <pre>{JSON.stringify(row)}</pre> }
      ]} data={armies} dense={true} />
    </TabPanel>
    <TabPanel value={value} index={1}>
      Item Two
    </TabPanel>
    <TabPanel value={value} index={2}>
      Item Three
    </TabPanel>
  </>;
}


export function AnalyzeDialogue(props: { onClose: () => void, open: boolean }) {
  return (<Dialog fullWidth maxWidth="lg"
      open={props.open}
      onClose={props.onClose} aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Analyze</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <AnalyzeDialogueContent/>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        {/*<Button onClick={props.onClose} color="primary">
        Subscribe
      </Button>*/}
      </DialogActions>
    </Dialog>
  );
}