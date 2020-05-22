import React, {useEffect, useState} from 'react';
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
import ClipLoader from 'react-spinners/ClipLoader';

const boxWidth = '1em';
const boxHeight = '1em';
const boxMargins = '0.1em';

const styles = (theme) => createStyles({
  boxFilled: {
    backgroundColor: '#111111',
    width: boxWidth,
    height: boxHeight,
    margin: boxMargins,
    display: 'inline-block'
  },
  boxEmpty: {
    backgroundColor: '#FFFFFF',
    border: '1px solid black',
    width: boxWidth,
    height: boxHeight,
    margin: boxMargins,
    display: 'inline-block'
  },
  boxesArea: {
    width: '86%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.secondary.light,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeScreen = ({classes, theme}) => {
  const WEEKS_IN_YEAR = 52.14285714285714432;
  const [birthday, setBirthday] = useState(new Date('1998-10-14'));
  const [untilTime, setUntilTime] = useState(new Date());
  const [numberOfYears, setNumberOfYears] = useState(79);
  const [numberOfWeeks, setNumberOfWeeks] = useState(Math.floor(numberOfYears * WEEKS_IN_YEAR));
  const [filledNumberOfWeeks, setFilledNumberOfWeeks] = useState(1);
  const [displayBoxes, setDisplayBoxes] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading === true) {
      setDisplayBoxes(true);
    } else {
      return;
    }
  }, [loading]);

  useEffect(() => {
    if (displayBoxes === true)
      setLoading(false);
  }, [displayBoxes]);


  const fillBoxes = () => {
    setDisplayBoxes(false);
    const birth = moment(birthday);
    const until = moment(untilTime);
    const weeks = until.diff(birth, 'week');
    setFilledNumberOfWeeks(weeks);
    setNumberOfWeeks(numberOfYears * WEEKS_IN_YEAR);
    setLoading(true);
  };

  return (
    <Grid container spacing={5} height={'100%'}>

      <Grid container item xs={12} spacing={3}>
        <Grid container justify={'center'} item xs={12} spacing={1}>
          <Box className={classes.boxFilled}/>
          <Box className={classes.boxEmpty}/>
        </Grid>
        <Grid conainer item xs={12} style={{textAlign: 'center'}}>
          <Typography variant={'body1'}>
            <h1>Hello,</h1>
            We are here to talk about your life ..<br/><br/>

            I'm going to represent your time in this life with boxes,<br/>
            and each box will represent one week ..<br/><br/>

            Each box can be either black or white,<br/>
            White box ( <Box className={classes.boxEmpty}/> ) means you didn't live this week yet!<br/>
            Black box ( <Box className={classes.boxFilled}/> ) means you were alive that week (Hopefully having
            fun!)<br/><br/>

            Now let's get into it, and get you your life boxes!
          </Typography>
        </Grid>
      </Grid>


      <Grid container item xs={12} justify={'center'}>
        <h2 style={{textAlign:'center'}}>
          Please fill the following dates:
        </h2>
      </Grid>
      <Grid container item justify={'center'} alignItems={'center'} xs={12}>
        <DatePicker label={'Birthday'} value={birthday} onChange={(date) => setBirthday(date)}/>
      </Grid>
      <Grid container item justify={'center'} alignItems={'center'} xs={12}>
        <DatePicker label={'Until When (default is today)'} value={untilTime} onChange={(date) => setUntilTime(date)}/>
      </Grid>
      <Grid container item justify={'center'} alignItems={'center'} xs={12}>
        <Grid container item justify={'center'} alignItems={'center'} xs={12}>
          <span style={{opacity: 0.7}}>
            Number of years you think you'll live<br/>
            (Human average is 79 years)
          </span>
        </Grid>
        <Grid container item justify={'center'} alignItems={'center'} xs={12}>
          <InputNumber
            min={1}
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
      {
        !loading ? null :
          <div className={classes.loading}>
            <div style={{paddingBottom: '2em'}}>
              Please wait, this is going to take a couple of seconds
            </div>
            <ClipLoader
              size={150}
              color={theme.palette.primary.main}
              loading={true}
            />
          </div>
      }
    </Grid>
  );
};

export default withStyles(styles, {withTheme: true})(HomeScreen);