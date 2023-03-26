import React from "react";
import MeetupDetail from "../components/meetups/MeetupDetail";
import { getAllMeetups, getMeetupData } from "../helpers/api-utils";

const MeetupDetailsPage = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export async function getStaticPaths() {
  const meetups = await getAllMeetups();

  return {
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup.id } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;
  console.log(meetupId);

  const meetupData = await getMeetupData(meetupId);
  console.log(meetupData);

  return {
    props: {
      meetupData,
    },
  };
}
export default MeetupDetailsPage;
