import React from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { VideoCardFromId } from 'src/features/videos/VideoCard';
import { useVideoMetadata } from 'src/features/videos/VideoApi';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '420px',
    marginTop: 120,
  },
  chart: {
    alignItems: 'center',
    minWidth: '420px',
    marginTop: 20,
  },
}));

function VideoCardPage() {
  const classes = useStyles();
  const { video_id } = useParams<{ video_id: string }>();
  // data and captions are used for the radarchart in this page
  const data: any = [
    {
      data: {
       
      },
      meta: { color: '' },
    },
  ];
  const captions: any = {
   
  };
  const video = useVideoMetadata(video_id);
  if ('criteria_scores' in video) {
    console.log(video.criteria_scores);
    video.criteria_scores?.forEach((criteria) => {
      if (criteria.score != undefined) {
        const caption = criteria.criteria;
        captions[caption] = criteria.criteria;
        data[0].data[caption] = criteria.score;
        console.log(captions);
        console.log(data);
      }
    });
  }

  return (
    <div>
      <div className={classes.root}>
        <VideoCardFromId videoId={video_id} />
      </div>
      <div className={classes.chart}> 
      {data!={} && <RadarChart captions={captions} data={data} size={450} />}
      </div>
    </div>
  );
}

export default VideoCardPage;
