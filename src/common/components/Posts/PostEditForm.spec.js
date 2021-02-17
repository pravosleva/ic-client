import { mount } from 'enzyme';
import PostEditForm from './PostEditForm';

/** @test {Post Edit Component} */
describe('Post Edit Component', () => {
    it('should render Post Edit', () => {
        const wrapper = mount(<PostEditForm post={{title: 'a', body: 'b'}} />);
        expect(wrapper.find('form')).toHaveLength(1);
    });
});