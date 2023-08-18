import { useEffect, useState } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Post from '../Post';
import DepartmentList from './DepartmentList';

const PostTable = () => {
  const departments = [
    {
      id: '1',
      name: 'customer_service',
      subDepartments: [
        { id: '1-1', name: 'Support' },
        { id: '1-2', name: 'customer_success' },
      ],
    },
    {
      id: '2',
      name: 'design',
      subDepartments: [
        { id: '2-1', name: 'graphic_design' },
        { id: '2-2', name: 'product_design' },
        { id: '2-3', name:  'web_desigs'}
      ],
    },
  ];

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="cotainer">
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map(post => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <DepartmentList departments={departments} />
    </div>
  );
};

export default PostTable;
