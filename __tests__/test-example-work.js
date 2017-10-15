import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import ExampleWork,{ ExampleWorkBubble } from '../js/example-work';

import Adapter from 'enzyme-adapter-react-16';
configure( { adapter: new Adapter() } );

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

const myWork = [
  {
    'title':"Work Example",
    'image': {
      'desc': "example screenshot of a project involving code",
      'src': "images/example1.png",
      'comment': ""
    }
  },
  {
    'title':"Portfolio Boilerplate",
    'image': {
      'desc': "Server less portfolio",
      'src': "images/example2.png",
      'comment': `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
       https://www.flickr.com/photos/ssoosay/4097410999`
    }
  }
];

describe("ExampleWork component",() => {

let component = shallow(<ExampleWork work={myWork}/>);
  it("should be a 'section' element", () =>{
    //expect("Hello").toEqual("Hello");
    //console.log(component.debug());
    expect(component.type()).toEqual('section');
  });

  it("should contain as many children as there are work examples.", () =>{
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  })
});

describe("ExampleWorkBubble component", () => {
  let component = shallow (<ExampleWorkBubble example={myWork[1]}/>);

  let images = component.find("img");

  it("should contain a single 'img' element", () => {
    expect(images.length).toEqual(1);
  });

  it("Should have the image src set correctly",() => {
    expect(images.prop('src')).toEqual(myWork[1].image.src);
  });
});
