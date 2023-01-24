import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.scss";
import ViewDetails from "./../../../assets/icons/details.svg";
import Input from "../../../components/Input/Input";
import Label from "../../../components/Label/Label";
import Button from "../../../components/Button/Button";
import service from "./../../../util/axiosConfig";
import lawyerIcon from "./../../../assets/icons/lawyerIcon.png";
import moment from "moment";
import StarRating from "../../../components/StarRating/StarRating";

const Profile = () => {
  const [lawyer, setLawyer] = useState();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [input, setInput] = useState({ reviewDescription: "", rating: 3 });
  const navigate = useNavigate();

  useEffect(async () => {
    const res = await service.get(`/lawyer/${id}`);
    console.log("ujjwal`", res.data);
    setLawyer(res.data.data);

    await getLawyerReview();
  }, []);

  const getLawyerReview = async () => {
    const res = await service.get(`/review/lawyer/${id}`);
    setReviews(res.data?.data);
  };

  const handleReviewSubmit = async (e) => {
    try {
      const payload = {
        description: input.reviewDescription,
        lawyer_id: parseInt(id),
        // client_id: 3,
        rating: parseInt(input.rating),
      };
      console.log(input);
      const res = await service.post(`/review`, payload);
      console.log("ujjwal reviews", res.data);
      setInput({ ...input, reviewDescription: "" });
      await getLawyerReview();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lawyer__container">
      {!!lawyer && (
        <div className="lawyer-profile">
          <div className="lawyer_card">
            <div className="logo__web">
              <img src={lawyerIcon} alt="" />
            </div>
            <div className="lawyer_card__container">
              <div className="heading">
                <div className="details">
                  <h1>{lawyer.full_name}</h1>
                </div>
                <div className="right">
                  <div className="viewFeatures ">
                    <div
                      onClick={() => navigate(`/lawyer/request/${lawyer.id}`)}
                    >
                      <p className="fz12">Contact Lawyer</p>
                      <img src={ViewDetails} alt="view details" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="policyNo">
                <p>
                  {lawyer?.location.city}, {lawyer?.location.state}
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

                <div className="meta__info">
                  <h2 className="key">Languages</h2>
                  <h3 className="value">
                    {lawyer?.languages.map((el) => el?.name).join(", ")}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="about_lawyer">
        <h2 className="about_lawyer__heading">About</h2>
        <div className="about_lawyer__content">
          Advocate {lawyer?.full_name} has been practicing and handling cases
          independently with a result oriented approach, both professionally and
          ethically and has now acquired {lawyer?.experience} years of
          professional experience in providing legal consultancy and advisory
          services. She has completed her {lawyer?.education} from Jamia Millia
          Islamia and has been practicing and handling cases independently and
          provides legal consultancy and advisory services.
          <br />
          Advocate {lawyer?.full_name} provides services in various field like{" "}
          {lawyer?.practice_areas
            .map((el) => el?.practice_area?.name)
            .join(", ")}{" "}
          .In addition to this she is skilled in drafting and vetting various
          kinds of agreement such as Master Service Agreement, Service
          Agreement, Teaming Agreement, Consortium Agreement, various Tripartite
          Agreement, RFQs, Letter of Intent, MOU, Agreement with Celebrity,
          Endorsement Agreement, License Agreement, Sub-Licensing Agreement,
          Sub-Contracting, Third Party Agreement, Sale Deed, Corporate Lease
          Agreement, Development Agreement(Real estate), broadcasting agreement.
          Advocate Ray enrolled with the Bar Council of Delhi in 2008.
        </div>
      </div>

      <div className="review-form">
        <h1>Add A Review</h1>
        <div>
          <Input
            type="textarea"
            className="review-textarea"
            name="reviewDescription"
            value={input}
            setValue={setInput}
          />
        </div>

        <StarRating
          handleChange={(val) => setInput({ ...input, rating: val })}
        />

        <Button onClick={handleReviewSubmit}>Submit</Button>
      </div>

      <div className="review-container">
        <h1>Reviews</h1>
        {reviews?.map((review, index) => {
          return (
            <div className="review-card" key={index}>
              <h2 className="review-card__name">{review?.client?.full_name}</h2>
              <div>
                {[...Array(review?.rating)].map((star, index) => {
                  return (
                    <span className="star on" key={index}>
                      &#9733;
                    </span>
                  );
                })}
              </div>
              <div className="review-card__description">
                {review?.description}
              </div>
              <div className="review-timestamp">
                <i className="fa fa-calendar" style={{ fontSize: "12px" }}></i>{" "}
                {moment(review?.created_at).fromNow()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
