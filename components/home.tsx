

import React from "react";
import Slideshow from "./slider-home";
import HomeFooter from "./footer";

const ImageMainHome: React.FC = () => {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <Slideshow />
      <h1 className="text-center text-4xl font-bold text-teal-700 mt-8">I ENJOY</h1>
      <h1 className="text-center text-4xl font-bold text-teal-700">THEREFORE I AM</h1>
      <p className="text-center text-teal-700 mt-4">You can always expect new taste and food when you explore Jo's menu</p>
      <div className="text-center mt-4">
          <button className="bg-teal-700 text-white py-2 px-4 rounded">سفارش آنلاین</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="md:col-span-1">
             
              <img src="/2222.jpg" alt="A table with various dishes and plants in the background" className="w-full h-auto rounded"/>
              <p className="text-teal-700 Class
Properties
text-left px-3 py-2 font-mono text-lg">In the heart of the bustling city, a cozy café beckons with the aroma of freshly brewed coffee and the sweet scent of pastries. The warm, inviting atmosphere is adorned with soft lighting and rustic decor, making it the perfect spot to unwind. As you sip on a velvety cappuccino, the rich flavors dance on your palate, complemented by a slice of decadent chocolate cake. Each bite is a delightful experience, blending comfort and indulgence. Whether you're catching up with friends or enjoying a moment of solitude, this café is a haven for food lovers and dreamers alike.</p>

          </div>
          <div className="grid grid-cols-1 gap-4">
              <img src="/555.jpg" alt="A bowl of food with garnish and bread" className="w-full h-auto rounded"/>
             
              <img src="/111.jpg" alt="A cozy cafe with plants and a person sitting" className="w-full h-auto rounded"/>

              <img src="slide4.jpg" alt="Coffee being brewed into a glass container" className="w-full h-auto rounded"/>
          </div>
        
      </div>
      <HomeFooter />
  </div>
    );
};

export default ImageMainHome;