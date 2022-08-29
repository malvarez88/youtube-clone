import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);
      setChannelDetail(data?.items[0]);
      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      setVideos(videosData?.items);
    };
    fetchResults();
  }, [id]);

  return (
    <Box minHeight= '95vh'>
      <Box>
        <div style= {{background: "linear-gradient(90deg, rgba(237,123,13,1) 0%, rgba(255,241,0,1) 100%)", zIndex: 10, height:'300px'}}/> 
        {/* https://cssgradient.io/ */}
        <ChannelCard channelDetail={channelDetail} marginTop='-110px'/>
      </Box>
    </Box>
  )
}

export default ChannelDetail;