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
  const [value, setValue] = React.useState('1');

  // @ts-ignore
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return <>
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      Item One
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
  return (<Dialog fullWidth maxWidth="lg" open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
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