//import {  useState } from 'react';
import { useState } from "react";
import "./basic.css";
import { talukData } from "./dat";

export default function Basic() {
  //let[name,setName]=useState(false);
  const [pdf, setPdf] = useState(false);
  const [Data, setData] = useState(talukData);
  const [state, setState] = useState(Object.keys(talukData));
  const [district, setDistrict] = useState([]);
  const [taluk, setTaluk] = useState([]);

  const data = {};
  let formData;
  function vals(e) {
    e.preventDefault();
    //setName(true);
    formData = new FormData(e.target);
    formData.forEach((value, key) => {
      data[key] = value;
    })
      console.log(data);
      setPdf(true);
      Object.keys(data).map((e, i) => {
        const tem =  document.getElementById(`p_${e}`) ;
        if(tem){
            tem.innerHTML = data[e]
        }
  });
      
      const divContents = document.getElementById("pdf").innerHTML;
      console.log(typeof divContents);
      var printWindow = window.open("", "", "height=400,width=800");
      printWindow.document.write(`<html><head><title>Tapovan</title><style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
        }

        h4 {
            color: #333;
            font-size: 20px;
        }

        h3, h2 {
            text-align: center;
            color: #333;
        }

        form {
            max-width: 800px;
            margin: auto;
        }


        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 10px ;
            border: 1px solid #ddd;
            text-align: start;
        }

        

        .input-group {
            display: flex;
            justify-content: space-between;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        p {
            margin: 0;
            padding: 8px;
            box-sizing: border-box;
        }
        </style>`);
      printWindow.document.write("</head><body >");
      printWindow.document.write(divContents);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    ;
  }

  function stateChangee(e) {
    const value = e.target.value;
    setDistrict(Data[value]);
  }

  function districtChange(e) {
    const value = e.target.value;
    console.log(district, value);
    setTaluk(district[value]);
  }

  return (
    <>
      <div class="header">
        <h2>Tapovana Ayurvedic Medical College and Hospital</h2>
        <h3>Case History Form And Treatment Plan</h3>
      </div>
      <form name="registration" className="form" onSubmit={vals}>
        <div class="form-header">
          <h4>Social Demographic Information</h4>
          <div>
            <div class="input-area">
              <label>Registration NO:</label>
              <input
                type="text"
                required
                name="regis_no"
                id="regis_no"
                placeholder="Enter the Registration 
                     No"
              />
            </div>
            <div class="input-area">
              <label>Date Of Registration: </label>
              <input
                type="date"
                required
                name="regis_date"
                id="regis_date"
                placeholder="............"
              />
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="input-area">
            {formData}
            <label>Name: </label>
            <input
              type="text"
              required
              name="regis_name"
              id="regis_name"
              placeholder="Enter the name"
            />
          </div>
          <div class="form-col">
            <div class="input-area">
              <label>Adress: </label>
              <textarea
                rows="4"
                required
                type="text"
                name="regis_addr"
                id="regis_addr"
                placeholder="Enter the Adress"
              ></textarea>
            </div>
            <div class="form-row">
              <div class="input-area">
                <label>State: </label>
                <select
                  class="input"
                  required
                  name="regis_state"
                  id="regis_state"
                  onChange={stateChangee}
                >
                  <option selected value="">
                    Select State
                  </option>
                  {state &&
                    state.map((e, i) => (
                      <option value={e} key={i}>
                        {e}
                      </option>
                    ))}
                </select>
              </div>
              <div class="input-area">
                <label>District: </label>
                <select
                  class="input"
                  required
                  name="regis_district"
                  id="regis_district"
                  onChange={districtChange}
                >
                  <option selected value="">
                    Select District
                  </option>
                  {district &&
                    Object.keys(district).map((e, i) => (
                      <option value={e} key={i}>
                        {e}
                      </option>
                    ))}
                </select>
              </div>

              <div class="input-area">
                <label>Taluk: </label>
                <select
                  class="input"
                  required
                  name="regis_taluk"
                  id="regis_taluk"
                >
                  <option selected value="">
                    Select Taluk
                  </option>

                  {taluk &&
                    taluk.map((e, i) => (
                      <option value={e} key={i}>
                        {e}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="input-area">
                <label>HomePhone: </label>
                <input
                  type="number"
                  required
                  name="regis_phone"
                  id="regis_phone"
                  placeholder="Enter the Home Phone No"
                />
              </div>
              <div class="input-area">
                <label>Telephone: </label>
                <input
                  type="number"
                  required
                  name="regis_tele"
                  id="regis_tele"
                  placeholder="Enter the Telephone No"
                />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="input-area-row">
              <label>Sex </label>
              <select name="regis_sex" required id="regis_sex">
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="input-area-row">
              <label>Age </label>
              <input
                type="number"
                required
                name="regis_age"
                id="regis_age"
                placeholder="Enter the Age"
              />
            </div>
            <div class="input-area-row">
              <label>DOB </label>
              <input
                type="date"
                required
                name="regis_dob"
                onchange="calculateAge()"
                id="regis_dob"
                placeholder=""
              />
            </div>
            <div class="input-area-row">
              <label>Religion </label>
              <input
                type="text"
                required
                name="regis_religion"
                id="regis_religion"
                placeholder="Enter the Religion"
              />
            </div>
            <div class="input-area-row">
              <label>Community </label>
              <input
                type="text"
                required
                name="regis_community"
                id="regis_community"
                placeholder="Enter the Community"
              />
            </div>
          </div>

          <div class="input-area">
            <label>Education Qualification(Specify): </label>
            <input
              type="text"
              required
              name="regis_educ_qual"
              id="regis_educ_qual"
              placeholder="Enter the Qualification"
            />
          </div>

          <div class="form-row">
            <div class="input-area">
              <label>occupation: </label>
              <select required name="regis_occupation" id="regis_occupation">
                <option value="">Select the occupation</option>
                <option value="Civil Services">Civil Services</option>
                <option value="PSU Jobs">PSU Jobs</option>
                <option value="State Public Service Commission">
                  State Public Service
                </option>
                <option value="Defence Services">Defence Services</option>
                <option value="Lecturer Or Professors">
                  Lecturer Or Professors
                </option>
                <option value="Railway Engineers">Railway Engineers</option>
                <option value="Bank Jobs">Bank Jobs</option>
              </select>
            </div>
            <div class="input-area">
              <label>income : </label>
              <input
                type="number"
                required
                name="regis_income"
                id="regis_income"
                placeholder="Enter the Income"
              />
            </div>
            <div class="input-area">
              <label>marital status : </label>
              <select
                required
                name="regis_marital_status"
                id="regis_marital_status"
              >
                <option value="">Select Marital Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </div>
          </div>
          <div class="input-area">
            <label>Living Arrangements : </label>
            <select required name="regis_living" id="regis_living">
              <option value="">Select your Living</option>
              <option value="Family">Living with Family</option>
              <option value="Friends">
                Lving with Friends or Distant Relatives
              </option>
              <option value="Alone">Living Alone</option>
              <option value="Street">On the Street</option>
            </select>
          </div>
          <hr />
          <div class="input-area">
            <label>Name of the Family member : </label>
            <input
              required
              type="text"
              name="regis_family_mem_name"
              id="regis_family_mem_name"
              placeholder="Enter the Name of Family member"
            />
          </div>
          <div class="input-area">
            <label>Name of a Support Person : </label>
            <input
              required
              type="text"
              name="regis_support"
              id="regis_support"
              placeholder="Enter the Support Person"
            />
          </div>
          <div class="input-area">
            <label>Address - Accompained the person : </label>
            <textarea
              required
              type="text"
              rows="4"
              name="regis_address_accomp"
              id="regis_address_accomp"
              placeholder="Enter the Address"
            ></textarea>
          </div>
          <div class="input-area">
            <label>Telephone: </label>
            <input
              required
              type="number"
              name="regis_tele_accomp"
              id="regis_tele_accomp"
              placeholder="Enter the Telephone No"
            />
          </div>
          <hr />
          <div class="input-area">
            <label>Referal : </label>
            <select required name="regis_referal" id="regis_referal">
              <option value="">Select the Referal</option>
              <option value="self">Self</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends or Distant Relatives</option>
              <option value="SocialWorker">Social Worker</option>
              <option value="Physicians">Physicians</option>
              <option value="RecoveredAddict">Recovered Addict</option>
              <option value="Employer">Employer</option>
              <option value="Media">Media</option>
              <option value="awarenessProgram">
                Through awareness Programs
              </option>
              <option value="Anyother">Anyother</option>
            </select>
          </div>
        </div>
        <input type="submit" class="submit" value="submit" />
      </form>

      <div id="snackbar"></div>

      <div id="pdf" style={{ display: pdf ? "block" : "none" }}>
        <h2>TAPOVANA AYURVEDIC MEDICAL COLLEGE & HOSPITAL</h2>
        <h3>CASE HISTORY FORM AND TREATMENT PLAN</h3>

        <form action="submit.php" method="post">
          <table>
            <tr>
              <th>Registration No.</th>
              <td>
                <p id="p_regis_no"></p>
              </td>
              <th>Date of Registration</th>
              <td>
                <p id="p_regis_date"></p>
              </td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Name</th>
              <td>
                <p id="p_regis_name"></p>
              </td>
            </tr>
            <tr>
              <th>Address</th>
              <td>
                <p id="p_regis_addr"></p>
              </td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Taluk</th>
              <td>
                <p id="p_regis_taluk"></p>
              </td>
              <th>District</th>
              <td>
                <p id="p_regis_district"></p>
              </td>
              <th>State</th>
              <td>
                <p id="p_regis_state"></p>
              </td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Home Phone</th>
              <td>
                <p id="p_regis_phone"></p>
              </td>
              <th>Telephone</th>
              <td>
                <p id="p_regis_tele"></p>
              </td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Sex</th>
              <th>Age</th>
              <th>Date of Birth</th>
              <th>Religion</th>
              <th>Community</th>
            </tr>
            <tr>
              <td>
                <p id="p_regis_sex"></p>
              </td>
              <td>
                <p id="p_regis_age"></p>
              </td>
              <td>
                <p id="p_regis_dob"></p>
              </td>
              <td>
                <p id="p_regis_religion"></p>
              </td>
              <td>
                <p id="p_regis_community"></p>
              </td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Educational Qualification</th>
              <td>
                <p id="p_regis_educ_qual"></p>
              </td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Occupation</th>
              <td>
                <p id="p_regis_occupation"></p>
              </td>
              <th>Income</th>
              <td>
                <p id="p_regis_income"></p>
              </td>
              <th>Marital Status</th>
              <td>
                <p id="p_regis_marital_status"></p>
              </td>
            </tr>
          </table>

          <div id="p_regis_living">
            <h4>Living Arrangements: (please tick/mark)</h4>
            <table>
              <tr>
                <td>Living with Family</td>
                <td>
                  <input
                    type="radio"
                    name="living_arrangements"
                    value="Family"
                  />
                </td>
                <td>Living with Friends or Distant Relatives</td>
                <td>
                  <input
                    type="radio"
                    name="living_arrangements"
                    value="Friends"
                  />
                </td>
              </tr>
              <tr>
                <td>Lives Alone</td>
                <td>
                  <input
                    type="radio"
                    name="living_arrangements"
                    value="Alone"
                  />
                </td>
                <td>On the Street</td>
                <td>
                  <input
                    type="radio"
                    name="living_arrangements"
                    value="Street"
                  />
                </td>
              </tr>
            </table>
          </div>

          <table>
            <tr>
              <th>Name of Family Member/Specify Name of Support Person</th>
              <td>
                <p id="p_regis_family_mem_name"></p>
              </td>
            </tr>
            <tr>
              <th>Address Accompanied the Person</th>
              <td>
                <p id="p_regis_address_accomp"></p>
              </td>
            </tr>
            <tr>
              <th>Telephone</th>
              <td>
                <p id="p_regis_tele_accomp"></p>
              </td>
            </tr>
          </table>
          <div id="p_regis_referal">
            {" "}
            <h4>Referral:</h4>
            <table>
              <tr>
                <td>Self</td>
                <td>
                  <input type="radio" name="referral" value="self" />
                </td>
                <td>Recovered Addict</td>
                <td>
                  <input type="radio" name="referral" value="RecoveredAddict" />
                </td>
              </tr>
              <tr>
                <td>Friends</td>
                <td>
                  <input type="radio" name="referral" value="Friends" />
                </td>
                <td>Employer</td>
                <td>
                  <input type="radio" name="referral" value="Employer" />
                </td>
              </tr>
              <tr>
                <td>Family</td>
                <td>
                  <input type="radio" name="referral" value="Family" />
                </td>
                <td>Media</td>
                <td>
                  <input type="radio" name="referral" value="Media" />
                </td>
              </tr>
              <tr>
                <td>Social Worker</td>
                <td>
                  <input type="radio" name="referral" value="SocialWorker" />
                </td>
                <td>Through Awareness Programme</td>
                <td>
                  <input
                    type="radio"
                    name="referral"
                    value="awarenessProgram"
                  />
                </td>
              </tr>
              <tr>
                <td>Physicians</td>
                <td>
                  <input type="radio" name="referral" value="Physicians" />
                </td>
                <td>Any Other</td>
                <td>
                  <input type="radio" name="referral" value="Anyother" />
                </td>
              </tr>
            </table>
          </div>
        </form>
      </div>
    </>
  );
}
