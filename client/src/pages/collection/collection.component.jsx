import React from "react";
import './collection.style.scss';
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selector";
import { useParams } from "react-router-dom";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { compose } from 'redux'

const withRouter = WrappedComponent => props => {
  const params = useParams();
  return(
    <WrappedComponent {...props} params = {params}/>
  );
};

const CollectionPage = ({collection}) => {
  const {title,items } = collection
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">{
        items.map(item => <CollectionItem key={item.id} item={item}/>)
      }
      </div>
          </div>
  );
}



const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.params.collectionId)(state)
});






export default compose(withRouter,connect(mapStateToProps),)(CollectionPage); 
