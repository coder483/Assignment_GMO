import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { Checkbox, FormControlLabel } from '@mui/material';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

interface Department {
  id: string;
  name: string;
  subDepartments?: Department[];
}

interface DepartmentListProps {
  departments: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments }) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => {
    const newSelectedDepartments = [...selectedDepartments];
    const department = departments.find(dep => dep.id === nodeId);
    
    if (department) {
      if (!newSelectedDepartments.includes(nodeId)) {
        newSelectedDepartments.push(nodeId);
        selectAllSubDepartments(department, newSelectedDepartments);
        selectParentDepartment(department, newSelectedDepartments);
      } else {
        newSelectedDepartments.splice(newSelectedDepartments.indexOf(nodeId), 1);
        unselectAllSubDepartments(department, newSelectedDepartments);
        unselectParentDepartment(department, newSelectedDepartments);
      }
    }
    
    setSelectedDepartments(newSelectedDepartments);
  };

  const selectAllSubDepartments = (department: Department, selectedDepartments: string[]) => {
    if (department.subDepartments) {
      department.subDepartments.forEach(subDepartment => {
        selectedDepartments.push(subDepartment.id);
        selectAllSubDepartments(subDepartment, selectedDepartments);
      });
    }
  };

  const unselectAllSubDepartments = (department: Department, selectedDepartments: string[]) => {
    if (department.subDepartments) {
      department.subDepartments.forEach(subDepartment => {
        const index = selectedDepartments.indexOf(subDepartment.id);
        if (index !== -1) {
          selectedDepartments.splice(index, 1);
        }
        unselectAllSubDepartments(subDepartment, selectedDepartments);
      });
    }
  };

  const selectParentDepartment = (department: Department, selectedDepartments: string[]) => {
    const parentDepartment = departments.find(dep =>
      dep.subDepartments?.some(subDep => subDep.id === department.id)
    );

    if (parentDepartment && !selectedDepartments.includes(parentDepartment.id)) {
      selectedDepartments.push(parentDepartment.id);
      selectParentDepartment(parentDepartment, selectedDepartments);
    }
  };

  const unselectParentDepartment = (department: Department, selectedDepartments: string[]) => {
    const parentDepartment = departments.find(dep =>
      dep.subDepartments?.some(subDep => subDep.id === department.id)
    );

    if (parentDepartment && selectedDepartments.includes(parentDepartment.id)) {
      selectedDepartments.splice(selectedDepartments.indexOf(parentDepartment.id), 1);
      unselectParentDepartment(parentDepartment, selectedDepartments);
    }
  };

  const handleSubDepartmentToggle = (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => {
    const newSelectedDepartments = [...selectedDepartments];
    const subDepartment = departments.flatMap(dep => dep.subDepartments || []).find(subDep => subDep.id === nodeId);

    if (subDepartment) {
      if (!newSelectedDepartments.includes(nodeId)) {
        newSelectedDepartments.push(nodeId);
      } else {
        newSelectedDepartments.splice(newSelectedDepartments.indexOf(nodeId), 1);
      }

      const parentDepartment = departments.find(dep =>
        dep.subDepartments?.some(subDep => subDep.id === nodeId)
      );

      if (parentDepartment) {
        if (parentDepartment.subDepartments?.every(subDep => newSelectedDepartments.includes(subDep.id))) {
          newSelectedDepartments.push(parentDepartment.id);
        } else {
          const index = newSelectedDepartments.indexOf(parentDepartment.id);
          if (index !== -1) {
            newSelectedDepartments.splice(index, 1);
          }
        }
      }
    }

    setSelectedDepartments(newSelectedDepartments);
  };

  const renderDepartment = (department: Department) => (
    <TreeItem
      key={department.id}
      nodeId={department.id}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedDepartments.includes(department.id)}
              onChange={e => handleToggle(e, department.id)}
            />
          }
          label={department.name}
        />
      }
    >
      {department.subDepartments?.map(subDepartment =>
        renderSubDepartment(subDepartment)
      )}
    </TreeItem>
  );

  const renderSubDepartment = (subDepartment: Department) => (
    <TreeItem
      key={subDepartment.id}
      nodeId={subDepartment.id}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedDepartments.includes(subDepartment.id)}
              onChange={e => handleSubDepartmentToggle(e, subDepartment.id)}
            />
          }
          label={subDepartment.name}
        />
      }
    />
  );
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      {departments.map(department => renderDepartment(department))}
    </TreeView>
  );
};


export default DepartmentList;
