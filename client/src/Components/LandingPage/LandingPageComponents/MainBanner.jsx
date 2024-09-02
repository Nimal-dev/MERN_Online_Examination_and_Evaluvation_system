import React from 'react'

function MainBanner() {
  return (
    <section class="home_banner_area">
      <div class="banner_inner">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="banner_content text-center">
                <p class="text-uppercase">
                  welcome to
                </p>
                <h2 style={{color:"#002347", fontFamily:"sans-serif"}} class="text-uppercase mt-4 mb-5">
                  Online Examination and Evaluvation System
                </h2>
                <div>
                  {/* <a href="/AuthPage" class="primary-btn2 mb-3 mb-sm-0">Register</a> */}
                  <a href="/AuthPage" class="primary-btn ml-sm-3 ml-0">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainBanner