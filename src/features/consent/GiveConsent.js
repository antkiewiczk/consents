import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addConsentAsync,
} from './consentsSlice';
import styles from './consent.module.scss';
import { Checkbox, FormControlLabel, FormGroup, TextField, Button } from '@mui/material';

export function GiveConsent() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consents, setConsents] = useState([]);
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(addConsentAsync({
      name,
      email,
      consents
    }));
    navigate('/collected-consents', { replace: true })
  }

  const updateConsents = (e) => {
    const { value } = e.target;
    let toUpdate = [...consents];

    if (!toUpdate.includes(value)) {
      toUpdate.push(value);
    } else {
      toUpdate = toUpdate.filter(el => el !== value);
    }
    setConsents(toUpdate);
  }

  const validate = () => {
    const re = /^[^\s@]+@[^\s@]+$/;
    return !(name.length && email.length && re.test(email) && consents.length);
  }

  return (
    <div className={styles.consent}>
      <form className={styles.form}>

        <div>
          <TextField variant="outlined" type="text" name="name" value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
          <TextField variant="outlined" type="email" name="email" value={email} placeholder="Email address" onChange={e => setEmail(e.target.value)} />
        </div>

        <div className={styles.consents}>
          I agree to:
          <FormGroup className={styles.checkboxes}>
            <FormControlLabel control={<Checkbox name="newsletter" value="newsletter" onChange={updateConsents}
              inputProps={{ 'aria-label': 'controlled' }} />} label="Receive newsletter" />
            <FormControlLabel control={<Checkbox name="ads" value="ads" onChange={updateConsents}
              inputProps={{ 'aria-label': 'controlled' }} />} label="Be shown targeted ads" />
            <FormControlLabel control={<Checkbox name="stats" value="stats" onChange={updateConsents}
              inputProps={{ 'aria-label': 'controlled' }} />} label="Contribute to anonymous visit statistics" />
          </FormGroup>
        </div>

        <Button variant="contained" color="primary" type="submit" onClick={submitForm} disabled={validate()}>Give consent</Button>
      </form>
    </div>
  );
}
