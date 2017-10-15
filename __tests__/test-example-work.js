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
  it("should be a 'span' element", () =>{
    //expect("Hello").toEqual("Hello");
    //console.log(component.debug());
    expect(component.type()).toEqual('span');
  });

  it("should contain as many children as there are work examples.", () =>{
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  })

  it("Should allow the modal to open and close",() =>{
    component.instance().openModal();
    expect(component.instance().state.modalOpen).toBe(true);

    component.instance().closeModal();
    expect(component.instance().state.modalOpen).toBe(false);
  })
});

describe("ExampleWorkBubble component", () => {
  let mockOpenModalFn = jest.fn();


  let component = shallow (<ExampleWorkBubble example={myWork[1]}
    openModal={mockOpenModalFn}/>);

  let images = component.find("img");

  it("should contain a single 'img' element", () => {
    expect(images.length).toEqual(1);
  });

  it("Should have the image src set correctly",() => {
    expect(images.getElement().props.src).toEqual(myWork[1].image.src);
  });

  it("Should call the openModal handler when clicked",() =>{
    component.find(".section__exampleWrapper").simulate('click');
    expect(mockOpenModalFn).toHaveBeenCalled();
  });

/*  it("Should call the closeModal handler when clicked",() =>{
    component.find(".modal__closeButton").simulate('click');
    expect(mockOpenModalFn).toHaveBeenCalled();
  });*/

});
