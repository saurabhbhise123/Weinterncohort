import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Table, Modal } from "antd";
import moment from "moment";
import { EditOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

function PostedJobs() {
  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const allusers = useSelector((state) => state.usersReducer).users;
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = alljobs.filter((job) => job.postedBy === userid);
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState();
  // console.log(userPostedJobs);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Assigned Incidents",
      dataIndex: "appliedCandidates",
    },
    {
      title: "Actions",
      render: (text, data) => {
        return (
          <div className="flex">
            <EditOutlined
              className='mr-3'
              onClick={() => {
                history.push(`/editjob/${data.completeJobData._id}`);
              }}
            />
            <OrderedListOutlined
              onClick={() => {
                showModal(job);
              }}
            />
          </div>
        );
      },
    },
  ];
  const dataSource = [];

  for (var job of userPostedJobs) {
    var obj = {
      title: job.title,
      category: job.category,
      postedOn: moment(job.CreatedAt).format("DD-MM-YYYY"),
      assignedIncidents: job.appliedCandidates.length,
      completeJobData: job,
    };
    dataSource.push(obj);
  }

  const showModal = (job) => {
    setIsModalVisible(true);
    setSelectedJob(job);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function CandidatesList() {
    const candidatesColumns = [
      {
        title: "Candidate Id",
        dataIndex: "candidateId",
        render: (text, data) => {
          return (
            <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
          );
        },
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
      },
      { title: "Applied Date", dataIndex: "appliedDate" },
    ];

    var candidatesDatasource = [];

    for (var candidate of selectedJob.appliedCandidates) {
      var user = allusers.find((user) => user._id === candidate.userid);

      var obj = {
        candidateId: user._id,
        fullName: user.firstName + " " + user.lastName,
        appliedDate: candidate.appliedDate,
      };

      candidatesDatasource.push(obj);
    }

    return (
      <Table columns={candidatesColumns} dataSource={candidatesDatasource} />
    );
  }

  return (
    <div>
      <DefaultLayout>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          title="Applied Candidates List"
          visible={isModalVisible}
          closable = {false}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <CandidatesList />
        </Modal>
      </DefaultLayout>
    </div>
  );
}

export default PostedJobs;
