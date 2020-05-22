import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import DatePicker from './DatePicker';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {createStyles} from '@material-ui/core';
import InputNumber from 'react-input-number';
import Box from '@material-ui/core/Box';
import {times} from 'lodash';
import moment from 'moment';
import NoSsr from '@material-ui/core/NoSsr';

const boxWidth = '1em';
const boxMargins = '0.1em';

const styles = () => createStyles({
  boxFilled: {
    backgroundColor: '#111111',
    width: boxWidth,
    height: boxWidth,
    margin: boxMargins,
  },
  boxEmpty: {
    backgroundColor: '#FFFFFF',
    border: '1px solid black',
    width: boxWidth,
    height: boxWidth,
    margin: boxMargins,
  },
  boxesArea: {
    border: '1px dashed black',
    width: '86%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }

});

const HomeScreen = ({classes}) => {
  const WEEKS_IN_YEAR = 52.14285714285714432;
  const [birthday, setBirthday] = useState(new Date('1998-10-14'));
  const [untilTime, setUntilTime] = useState(new Date());
  const [numberOfYears, setNumberOfYears] = useState(88);
  const [numberOfWeeks, setNumberOfWeeks] = useState(Math.floor(numberOfYears * WEEKS_IN_YEAR));
  const [filledNumberOfWeeks, setFilledNumberOfWeeks] = useState(1);
  const [displayBoxes, setDisplayBoxes] = useState(false);


  const fillBoxes = () => {
    const birth = moment(birthday);
    const until = moment(untilTime);
    const weeks = until.diff(birth, 'week');
    setFilledNumberOfWeeks(weeks);
    setNumberOfWeeks(numberOfYears * WEEKS_IN_YEAR);
    setDisplayBoxes(true);
  };

  return (
    <Grid container spacing={5} height={'100%'}>
      <Grid container item xs={12} justify={'center'}>
        <h1>
          Please input dates
        </h1>
      </Grid>
      <Grid container item justify={'center'} alignItems={'center'} xs={12} sm={12} md={4}>
        <DatePicker label={'Birthday'} value={birthday} onChange={(date) => setBirthday(date)}/>
      </Grid>
      <Grid container item justify={'center'} alignItems={'center'} xs={12} sm={12} md={4}>
        <DatePicker label={'Until When (default is today)'} value={untilTime} onChange={(date) => setUntilTime(date)}/>
      </Grid>
      <Grid container item justify={'center'} alignItems={'center'} xs={12} sm={12} md={4}>
        <Grid container item justify={'center'} alignItems={'center'} xs={12}>
          <span style={{opacity: 0.7}}>
            Number of years (Default is 88 years)
          </span>
        </Grid>
        <Grid container item justify={'center'} alignItems={'center'} xs={12}>
          <InputNumber
            min={10}
            max={150}
            value={numberOfYears}
            onChange={(number) => setNumberOfYears(number)}
            enableMobileNumericKeyboard/>
        </Grid>
      </Grid>
      <Grid container item xs={12} justify={'center'} alignItems={'center'}>
        <Button color={'primary'} variant={'contained'} size={'large'} onClick={fillBoxes}>
          <Typography variant={'button'}><b>Fill my boxes</b></Typography>
        </Button>
      </Grid>
      {
        displayBoxes ?
          <NoSsr>
            <Grid
              container
              justify={'center'}
              alignItems={'center'}
              item
              xs={12}
            >
              <div className={classes.boxesArea}>
                {
                  times(numberOfWeeks, (i) =>
                    (
                      i < filledNumberOfWeeks ?
                        <Box className={classes.boxFilled} key={i}/> :
                        <Box className={classes.boxEmpty} key={i}/>
                    )
                  )
                }
              </div>
            </Grid>
          </NoSsr>
          : null
      }
    </Grid>
  );
};

export default withStyles(styles)(HomeScreen);