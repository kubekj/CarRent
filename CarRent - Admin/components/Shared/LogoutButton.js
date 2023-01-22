import React from "react";

import { signOut } from "next-auth/react";

import { Button } from "@mui/material";

function LogoutButton() {
  return (
    <Button variant='contained' onClick={signOut}>
      Wyloguj się
    </Button>
  );
}

export default LogoutButton;
