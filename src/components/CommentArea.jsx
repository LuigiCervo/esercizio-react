import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      try {
        let response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/${props.asin}`,
          {
            headers: {
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjMzVhYjBlNzg3MDAwMTRkODkzYjQiLCJpYXQiOjE2ODA2MTg5MjMsImV4cCI6MTY4MTgyODUyM30.k-kkKSoaqusAVWWqcOUeFzuFiU2Qq56PKhUOtM2IDIc"
            }
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          setComments(comments);
          setIsLoading(false);
          setIsError(false);
        } else {
          console.log('error');
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    }

    fetchData();

  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
}



//class CommentArea extends Component {
//  state = {
//    comments: [],
//    isLoading: false,
//    isError: false,
//  }
//
//  // componentDidMount = async () => {
//  //   try {
//  //     let response = await fetch(
//  //       'https://striveschool-api.herokuapp.com/api/comments/' +
//  //         this.props.asin,
//  //       {
//  //         headers: {
//  //           Authorization: ' your-auth-token-goes-here',
//  //         },
//  //       }
//  //     )
//  //     console.log(response)
//  //     if (response.ok) {
//  //       let comments = await response.json()
//  //       this.setState({ comments: comments, isLoading: false, isError: false })
//  //     } else {
//  //       console.log('error')
//  //       this.setState({ isLoading: false, isError: true })
//  //     }
//  //   } catch (error) {
//  //     console.log(error)
//  //     this.setState({ isLoading: false, isError: true })
//  //   }
//  // }
//
//  componentDidUpdate = async (prevProps) => {
//    if (prevProps.asin !== this.props.asin) {
//      this.setState({
//        isLoading: true,
//      })
//      try {
//        let response = await fetch(
//          'https://striveschool-api.herokuapp.com/api/comments/' +
//            this.props.asin,
//          {
//            headers: {
//              Authorization: 'Bearer your-auth-token-goes-here',
//            },
//          }
//        )
//        console.log(response)
//        if (response.ok) {
//          let comments = await response.json()
//          this.setState({
//            comments: comments,
//            isLoading: false,
//            isError: false,
//          })
//        } else {
//          console.log('error')
//          this.setState({ isLoading: false, isError: true })
//        }
//      } catch (error) {
//        console.log(error)
//        this.setState({ isLoading: false, isError: true })
//      }
//    }
//  }
//
//  render() {
//    return (
//      <div className="text-center">
//        {this.state.isLoading && <Loading />}
//        {this.state.isError && <Error />}
//        <AddComment asin={this.props.asin} />
//        <CommentList commentsToShow={this.state.comments} />
//      </div>
//    )
//  }
//}

export default CommentArea;
