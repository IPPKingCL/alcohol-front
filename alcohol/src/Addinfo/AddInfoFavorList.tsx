import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import { addr } from '../Common/serverAddr';
import {AlchoCategory} from '../interface/AlchoCategory'

function not(a: readonly AlchoCategory[], b: readonly AlchoCategory[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly AlchoCategory[], b: readonly AlchoCategory[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly AlchoCategory[], b: readonly AlchoCategory[]) {
  return [...a, ...not(b, a)];
}

export default function TransferList(props : {type : string, setState : any}) {
  const [checked, setChecked] = React.useState<readonly AlchoCategory[]>([]);
  
  const [leftList, setLeftList] = React.useState<AlchoCategory[]>([]);
  const [rightList, setRightList] = React.useState<AlchoCategory[]>([]);

  const leftChecked = intersection(checked, leftList);
  const rightChecked = intersection(checked, rightList);

  useEffect(() => {
    fetch(addr + '/alcohol/category', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json())
    .then((res) => {
      let i = 0;
      for(i; i<res.length; i++) {
        const alcho : AlchoCategory = {id : res[i].id, category : res[i].category};
        console.log("1 " + res[i].id);
        console.log("2 " + res[i].category);
        console.log("alcho " + alcho.id);
        console.log("alcho " + alcho.category);
        setLeftList(leftList => [...leftList, alcho]);
      }

    })
  },[])

  useEffect(() => {
    if(rightList.length == 3) {
      console.log(rightList);
      props.setState(rightList, true);
    }else {
      props.setState(rightList, false);
    }
  },[rightList]);

  const handleToggle = (value: AlchoCategory) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(leftList)
  };

  const numberOfChecked = (items: readonly AlchoCategory[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly AlchoCategory[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    if (rightList.length >= 3 || leftChecked.length + rightList.length > 3) {
      alert("3개만 선택 할 수 있습니다.");
    } else {
      setRightList(rightList.concat(leftChecked));
      setLeftList(not(leftList, leftChecked));
      setChecked(not(checked, leftChecked));
      console.log(rightList.length);
    }
    

  };

  const handleCheckedLeft = () => {
    setLeftList(leftList.concat(rightChecked));
    setRightList(not(rightList, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly AlchoCategory[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: AlchoCategory) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.category} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Choices', leftList)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', rightList)}</Grid>
    </Grid>
  );
}