import React from 'react'

function Services() {
  return (
    <section class="feature_area section_gap_top" id='services'>
      <div class="container" >
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="main_title">
              <h2 style={{color:"#002347"}} class="mb-3">Awesome Features</h2>
              <p>
                We provide the best in class features
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="single_feature">
              <div class="icon"><i className="fa fa-user" aria-hidden="true"></i></div>
              <div class="desc">
                <h4 style={{color:"#002347"}} class="mt-3 mb-2">Teachers Facility</h4>
                <p>
                  Interactive and Minimal UI dashboard for teachers
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="single_feature">
              <div class="icon"><i className="fa fa-book" aria-hidden="true"></i></div>
              <div class="desc">
                <h4 style={{color:"#002347"}} class="mt-3 mb-2">Examination Facility</h4>
                <p>
                  An intercative minimalistic examination page for students
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="single_feature">
              <div class="icon"><i className="fa fa-users" aria-hidden="true"></i></div>
              <div class="desc">
                <h4 style={{color:"#002347"}} class="mt-3 mb-2">Students Facility</h4>
                <p>
                 We provide best in class students interface with detailed reports
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services