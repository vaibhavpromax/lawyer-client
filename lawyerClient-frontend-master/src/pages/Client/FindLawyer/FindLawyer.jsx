import React, { useEffect, useState } from "react";
import Container from "../../../components/Container/Container";
import PageContainer from "../../../components/PageContainer/PageContainer";
import "./FindLawyer.scss";
import LeftFilter from "./LeftFilter";
import ViewDetails from "./../../../assets/icons/details.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "./../../../util/axiosConfig";
import lawyerIcon from "./../../../assets/icons/lawyerIcon.png";

const FindLawyer = () => {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);

  useEffect(async () => {
    const res = await service.get("/lawyer");

    console.log("ujjwal ", res.data);

    if (res.data.msg === "success") {
      setLawyers(res.data.data);
    }
  }, []);
  return (
    <Container className="find_lawyer">
      <LeftFilter setLawyers={setLawyers} />

      <div className="right_column">
        <div className="right_column__heading">
          Consult Best Family Lawyers / Advocates in India
          <p>
            Whether you are filing a divorce, wanting child custody, alimony or
            maintenance, fighting 498a, fighting a dispute related to discord in
            the family, or are being harassed by your children, choose a lawyer
            who is an expert in family law. Use Vakalat to hire a top rated
            family dispute lawyer in India.
          </p>
        </div>

        <div className="cards__container">
          {lawyers.map((lawyer) => {
            return (
              <div className="lawyer_card" key={lawyer.id}>
                <div className="logo__web">
                  <img src={lawyerIcon} alt="" width={10} height="10" />
                </div>
                <div className="lawyer_card__container">
                  <div className="heading">
                    <div className="details">
                      <h2>{lawyer.full_name}</h2>
                    </div>
                    <div className="right">
                      <div className="viewFeatures">
                        <div onClick={() => navigate(`/lawyer/${lawyer.id}`)}>
                          <p className="fz12">View Details</p>
                          <img src={ViewDetails} alt="view details" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="policyNo">
                    <p>
                      {lawyer.location.city}, {lawyer.location.state}
                    </p>
                    <div className="tooltip_policy"></div>
                  </div>
                  <div className="policyNo">
                    <p>{lawyer.experience} years Experience</p>
                    <div className="tooltip_policy"></div>
                  </div>
                  <hr />
                  <div className="meta">
                    <div className="meta__info">
                      <h2 className="key">Practice area &amp; skills</h2>
                      <h3 className="value">
                        {lawyer?.practice_areas
                          .map((el) => el?.practice_area?.name)
                          .join(", ")}
                      </h3>
                    </div>

                    <div className="meta__info">
                      <h2 className="key">Courts</h2>
                      <h3 className="value">
                        {lawyer?.courts.map((el) => el?.name).join(", ")}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default FindLawyer;
