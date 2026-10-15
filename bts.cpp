#include <iostream>
#include <string>
//#include <boolean>
using namespace std;
//Tao class Student
class student{
	public:
		string name;	
		int id;
		student(){
		}
		student (string name, int id){
			this->name = name;
			this->id = id;
		}
};
class Node{
	public:
		student data;
		Node* left;
		Node* right;
	Node(){
		
	}
	Node( int id, string name){
		this->data.id = id;
		this->data.name = name;
		this->left = NULL;
		this->right = 0;
	}
};
class myBST{
	public:
		Node* root = NULL;
	bool isEmpty(){
		return root == NULL;
	}
	void insert(int id, string name){
		if (isEmpty()) {
			root = new Node(id, name);
			return;
		}
		Node* cur = root;
		while (cur != 0) {
			if (cur->data.id > id) {
				if (cur->left == 0) cur->left = new Node(id,name);
				cur = cur->left;
			}
			if (cur->data.id < id) {
				if (cur->right == 0) cur->right = new Node(id,name);
				cur = cur->right;
			}
			if (cur->data.id == id) {
				break;
			}
		}
	}
	
	void visit(Node* p){
		if (p == 0) return;
		else{
			cout << "(" << p->data.id << "," << p->data.name << ") " ;
		}
	}
	Node* inOrder(Node* p){//L --> N --> R
		if (p == 0) return p;
		inOrder(p->left);
		visit(p);
		inOrder(p->right);
	}
	void inOrder(){
		inOrder(root);
	}
};
int main(){
	myBST mb;
	mb.insert(10,"A");
	mb.insert(8,"B");
	mb.insert(6,"C");
	mb.insert(12,"D");
	mb.insert(9,"E");
	mb.insert(15,"F");
	mb.insert(11,"G");
	mb.insert(9,"H");
	mb.inOrder();
}