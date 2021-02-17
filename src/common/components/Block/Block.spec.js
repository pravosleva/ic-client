import { mount } from 'enzyme';
import Block from './Block';

/** @test {Block Component} */
describe('Block Component', () => {
    it('should render Block', () => {
        const wrapper = mount(<Block />);
        expect(wrapper.find('div')).toHaveLength(1);
    });
});