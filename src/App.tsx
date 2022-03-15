import { useState } from "react";
import { Container, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { FormattedMessage, useIntl } from "react-intl";
import { MuiController } from "./MuiController";
import { MuiControllerHook } from "./MuiControllerHook";
import { Tailwind } from "./Tailwind";

export const App = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const intl = useIntl();

  return (
    <TabContext value={selectedTab}>
      <TabList
        onChange={(event, value) => setSelectedTab(value)}
        aria-label={intl.formatMessage({ defaultMessage: "Tabs" })}
        sx={{
          bgcolor: "common.white",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tab
          label={<FormattedMessage defaultMessage="Tailwind + register" />}
          value="1"
        />
        <Tab
          label={<FormattedMessage defaultMessage="MUI + Controller" />}
          value="2"
        />
        <Tab
          label={<FormattedMessage defaultMessage="MUI + Controller Hook" />}
          value="3"
        />
      </TabList>

      <Container component="main" sx={{ mt: 4 }} maxWidth="sm">
        <TabPanel value="1">
          <Tailwind />
        </TabPanel>
        <TabPanel value="2">
          <MuiController />
        </TabPanel>
        <TabPanel value="3">
          <MuiControllerHook />
        </TabPanel>
      </Container>
    </TabContext>
  );
};
