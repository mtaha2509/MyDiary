import React from "react";
import Entry from "./Entry";
import "./Section1.css";
import list from "./Component";

function Section1() {
  function CreateEntry(Item) {
    return (
      <div
        className="col-lg-4 col-md-6 col-sm-12 entry-column"
        key={Item.title}
      >
        <Entry
          color={Item.color}
          img={Item.SVG}
          title={Item.title}
          desc={Item.desc}
        />
      </div>
    );
  }

  return (
    <section className="section1">
      <div className="section1-container container">
        <div className="section1-content">
          <h2>
            Unlock your journaling journey
            <br />
            <span>Reflect, Discover, You.</span>
          </h2>
          <div className="row">{list.map(CreateEntry)}</div>
        </div>
      </div>
    </section>
  );
}

export default Section1;
