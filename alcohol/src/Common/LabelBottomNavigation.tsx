import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { createSvgIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, EventNote, LocalBar, Person } from '@mui/icons-material';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const navigate = useNavigate();
  const recommend = () => { navigate('/recommend') };//술 추천
  const mbti = () => { navigate('/alcohol') };//술 정보
  const home = () => { navigate('/Main') };
  const free = () => { navigate('/free') };
  const myPage = () => { navigate('/myPage') };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(newValue);
  };

  const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    'Home',
  );

  const setDefaultFooter = () => {
    setValue("");
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels sx={{
      background: 'white',
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      height : '7vh',
    }}>
      <BottomNavigationAction
        label="오늘의 술"
        value="오늘의 술"
        icon={<FavoriteIcon />}
        onClick={recommend}
      />
      <BottomNavigationAction
        label="술 정보"
        value="술 정보"
        icon={<LocalBar />}
        onClick={mbti}
      />
      <BottomNavigationAction
        label="홈"
        value="홈"
        icon={<HomeIcon />}
        onClick={home}
      />
      <BottomNavigationAction
        label="게시판"
        value="게시판"
        icon={<EventNote />}
        onClick={free}
      />
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<Person />}
        onClick={myPage}
      />
    </BottomNavigation>
  );
}