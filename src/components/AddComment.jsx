import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'

const AddComment = (props) => {

  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(1);
  const [elementId, setElementId] = useState(props.asin);

  const sendComment = async (e) => {
    e.preventDefault()
    try {
      const newComment = {
        comment: comment,
        rate: rate,
        elementId: elementId
      };
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(newComment),
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjMzVhYjBlNzg3MDAwMTRkODkzYjQiLCJpYXQiOjE2ODA2MTg5MjMsImV4cCI6MTY4MTgyODUyM30.k-kkKSoaqusAVWWqcOUeFzuFiU2Qq56PKhUOtM2IDIc',
          },
        }
      )
      if (response.ok) {
        alert('Comment was sent!')
        setComment('');
        setRate(1);
        setElementId(props.asin);
      } else {
        console.log('error')
        alert('something went wrong')
      }
    } catch (error) {
      console.log('error')
    }
  };

  useEffect(() => {
    setComment(comment);
    setElementId(elementId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  return (
      <div className="my-3">
        <Form onSubmit={sendComment}>
          <Form.Group>
            <Form.Label>Comment text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add comment here"
              value={comment}
              onChange={(e) =>setComment(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
}

//class AddComment extends Component {
//  state = {
//    comment: '',
//    rate: 1,
//    elementId: this.props.asin,
//  }
//
//  componentDidUpdate(prevProps) {
//    if (prevProps.asin !== this.props.asin) {
//      this.setState({
//        comment: {
//          ...this.state.comment,
//          elementId: this.props.asin,
//        },
//      })
//    }
//  }
//
//  sendComment = async (e) => {
//    e.preventDefault()
//    try {
//      let response = await fetch(
//        'https://striveschool-api.herokuapp.com/api/comments',
//        {
//          method: 'POST',
//          body: JSON.stringify(this.state.comment),
//          headers: {
//            'Content-type': 'application/json',
//            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjMzVhYjBlNzg3MDAwMTRkODkzYjQiLCJpYXQiOjE2ODA2MTg5MjMsImV4cCI6MTY4MTgyODUyM30.k-kkKSoaqusAVWWqcOUeFzuFiU2Qq56PKhUOtM2IDIc',
//          },
//        }
//      )
//      if (response.ok) {
//        alert('Comment was sent!')
//        this.setState({
//          comment: {
//            comment: '',
//            rate: 1,
//            elementId: this.props.asin,
//          },
//        })
//      } else {
//        console.log('error')
//        alert('something went wrong')
//      }
//    } catch (error) {
//      console.log('error')
//    }
//  }
//
//  render() {
//    return (
//      <div className="my-3">
//        <Form onSubmit={this.sendComment}>
//          <Form.Group>
//            <Form.Label>Comment text</Form.Label>
//            <Form.Control
//              type="text"
//              placeholder="Add comment here"
//              value={this.state.comment.comment}
//              onChange={(e) =>
//                this.setState({
//                  comment: {
//                    ...this.state.comment,
//                    comment: e.target.value,
//                  },
//                })
//              }
//            />
//          </Form.Group>
//          <Form.Group>
//            <Form.Label>Rating</Form.Label>
//            <Form.Control
//              as="select"
//              value={this.state.comment.rate}
//              onChange={(e) =>
//                this.setState({
//                  comment: {
//                    ...this.state.comment,
//                    rate: e.target.value,
//                  },
//                })
//              }
//            >
//              <option>1</option>
//              <option>2</option>
//              <option>3</option>
//              <option>4</option>
//              <option>5</option>
//            </Form.Control>
//          </Form.Group>
//          <Button variant="primary" type="submit">
//            Submit
//          </Button>
//        </Form>
//      </div>
//    )
//  }
//}

export default AddComment
