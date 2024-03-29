import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import Header from '../../../components/Layout/DefaultLayout/Header';
import { useEffect } from 'react';
import { useState } from 'react';
import dataAPI from '../../../api/data';

const Users = () => {
    const selectionsettings = { persistSelection: true };
    const toolbarOptions = ['Delete', 'Edit', 'Update', 'Cancel'];
    const editing = { allowDeleting: true, allowEditing: true };
    const [usersData, setUsersData] = useState([]);

    const customerGridImage = (props) => (
        <div className="image flex gap-4 items-center">
          {/* <img
            className="rounded-full w-10 h-10"
            src={props.CustomerImage}
            alt="employee"
          /> */}
          <div>
            <p>{props.name}</p>
          </div>
        </div>
      );

    const usersGrid = [
        { type: 'checkbox', width: '50' },
        {
            headerText: 'Name',
            width: '150',
            template: customerGridImage,
            textAlign: 'Center'
        },
        {
            field: 'email',
            headerText: 'Email',
            width: '150',
            textAlign: 'Center'
        },
        {
            field: 'status',
            headerText: 'Status',
            width: '130',
            textAlign: 'Center',
            editType: 'dropdownedit'
        },
        {
            field: 'phoneNumber',
            headerText: 'Phone Number',
            width: '150',
            textAlign: 'Center'
        },
        {
            field: 'address',
            headerText: 'Address',
            width: '100',
            textAlign: 'Center'
        },
        {
            field: 'role',
            headerText: 'Role',
            width: '150',
            textAlign: 'Center'
        },
    ];

    useEffect(() => {
        const getData = async() => {
            const users = await dataAPI.getAllUser();
            setUsersData(users);
        }

        getData();
    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
            <Header category="Page" title="Users" />
            <GridComponent
                dataSource={usersData}
                enableHover={true}
                allowPaging
                pageSettings={{ pageCount: 5 }}
                selectionSettings={selectionsettings}
                toolbar={toolbarOptions}
                editSettings={editing}
                allowSorting
            >
                <ColumnsDirective>
                    {usersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
            </GridComponent>
        </div>
    );
};

export default Users;
