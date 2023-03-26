import React from "react";

import MeetupList from "../components/meetups/MeetupList";
import { getAllMeetups } from "../helpers/api-utils";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export async function getStaticProps() {
  const meetups = await getAllMeetups();
  return { props: { meetups }, revalidate: 60 };
}

export default HomePage;
