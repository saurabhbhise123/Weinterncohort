import { Button } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { applyJob } from "../redux/actions/jobActions";
import { Tag } from 'antd';

function JobInfo({ match }) {
  const { jobs } = useSelector((state) => state.jobsReducer);

  const job = jobs.find((job) => job._id === match.params.id);

  const userid = JSON.parse(localStorage.getItem("user"))._id;

  const appliedCandidates = job.appliedCandidates;

  const alreadyApplied = appliedCandidates.find(
    (candidate) => candidate.userid === userid
  );

  const dispatch = useDispatch();

  function applyNow() {
    dispatch(applyJob(job));
  }

  return (
    <div>
      <DefaultLayout>
        {job && (
          <div>
            <p>
              <b>Title</b> : {job.title}
            </p>
            <p>
              <b>Category</b> : {job.category}
            </p>
            <p>
              <b>Small Description</b> : {job.smallDescription}
            </p>
            <p>
              <b>Full Description</b> : {job.fullDescription}
            </p>
            <p>
              <b>Service</b> : {job.service}
            </p>
            <p>
              <b>Priority</b> : {job.priority}
            </p>
            <p>
              <b>Impact</b> : {job.impact}
            </p>

            <hr />

            <p>
              <b>Urgency</b> : {job.urgency}
            </p>
            <p>
              <b>Caller</b> : {job.caller}
            </p>
            <p>
              <b>Company Profile</b> : {job.companyDescription}
            </p>
            <p>
              <b>Total users Assigned</b> : {job.appliedCandidates.length}
            </p>

            <hr />
            <div className="flex justify-content-between">
              {job.postedBy === userid ? (
                <Button>
                  <Link to={`/editjob/${job._id}`}>Edit Now</Link>
                </Button>
              ) : alreadyApplied ? (
                <Tag color="red">Already Assigned</Tag>
              ) : (
                <Button onClick={applyNow}>Assign To Me</Button>
              )}
              <p>
                <b>Posted On</b> : {moment(job.createdAt).format("MMM-DD-YYYY")}
              </p>
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}

export default JobInfo;
