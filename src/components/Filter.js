import { Input, Modal , Form , Select , Button} from "antd";
import React, { useState } from "react";
import {  FilterOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { searchJobs, sortJobs } from "../redux/actions/jobActions";

const { Search } = Input;
const {Option} = Select;
function Filter() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function sort(values){

     dispatch(sortJobs(values))

     handleCancel()

  }
  return (
    <div className="flex">
      <Search onSearch={(value)=>{dispatch(searchJobs(value))}}/>
      <FilterOutlined onClick={showModal}/>

      <Modal title="Select filters" footer={false} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} closable={false}>
          <Form layout='vertical' onFinish={sort}>
                <Form.Item name='priority' label='Priority'>

                    <Select>
                        <Option value="Normal">Normal</Option>
                        <Option value="Critical">Critical</Option>
                        <Option value="Moderate">Moderate</Option>

                    </Select>

                </Form.Item>

                <Form.Item name='urgency' label='Urgency'>

                    <Select>
                        <Option value="Low">Low</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="High">High</Option>
                      

                    </Select>

                </Form.Item>
                <Button htmlType="submit">Filter</Button>
          </Form>
      </Modal>
    </div>
  );
}

export default Filter;