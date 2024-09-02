import React from 'react'

function About() {
  return (
    <div class="section_gap registration_area" id="about">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <div class="row clock_sec clockdiv" id="clockdiv">
            <div class="col-lg-12">
              <h1 class="mb-3">About Us</h1>
              <p style={{textAlign:"justify"}}>
              We are a team of passionate and dedicated individuals who are committed to revolutionizing the way educational institutions and organizations assess and evaluate student Examination outcomes. 
              </p>
            </div>
            
          </div>
        </div>
        <div class="col-lg-4 offset-lg-1">
         <img src="../img/abt-us.jpg" alt="About Us image" style={{width:"500px", borderRadius:"40px 0px 40px 0px"}}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About