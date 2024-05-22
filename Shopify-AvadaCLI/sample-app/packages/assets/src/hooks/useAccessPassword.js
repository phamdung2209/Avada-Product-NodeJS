import React, {useState} from 'react';
import {Button, EmptyState, TextField} from '@shopify/polaris';
import {DEV_ZONE_KEY, DEV_ZONE_PASSWORD} from '../config/dev_zone/password';
import CryptoJS from 'crypto-js';

export default function useAccessPassword() {
  const [input, setInput] = useState('');
  const [access, setAccess] = useState(null);
  const devZone = localStorage.getItem(DEV_ZONE_KEY);
  if (devZone) {
    const decrypt = CryptoJS.AES.decrypt(devZone, DEV_ZONE_PASSWORD).toString(CryptoJS.enc.Utf8);
    const {password, expiredAt} = JSON.parse(decrypt);
    if (password === DEV_ZONE_PASSWORD && expiredAt >= new Date().getTime()) {
      return {access: true};
    }
  }
  function handleCheckAccess() {
    if (input !== DEV_ZONE_PASSWORD) {
      setAccess(false);
      return;
    }
    const date = new Date();
    date.setDate(date.getDate() + 365);
    const encrypt = CryptoJS.AES.encrypt(
      JSON.stringify({
        password: DEV_ZONE_PASSWORD,
        expiredAt: new Date(date).getTime()
      }),
      DEV_ZONE_PASSWORD
    ).toString();
    localStorage.setItem(DEV_ZONE_KEY, encrypt);
    setAccess(true);
  }

  const render = (
    <EmptyState heading="Enter password">
      <div
        onKeyDown={event => {
          if (event.keyCode === 13) handleCheckAccess();
        }}
      >
        <TextField
          label=""
          labelHidden
          value={input}
          type="password"
          onChange={value => setInput(value)}
          connectedRight={
            <Button primary onClick={() => handleCheckAccess()}>
              Access
            </Button>
          }
          error={access === false && 'Incorrect password'}
        />
      </div>
    </EmptyState>
  );
  return {access, render};
}
