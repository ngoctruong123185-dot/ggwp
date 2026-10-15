#include <iostream>
#include <string>
using namespace std;
 
class Student {
	public:
		string name;
		int id;
		Student() {}
		Student(string name, int id) {
			this->name = name;
			this->id = id;
		}
};
 
class Node {
	public:
		Student* data;
		Node* next;
		Node() {}
		Node(string name, int id) {
			this->data = new Student(name, id);
			this->next = nullptr;
		}
};
 
class LinkedList {
	public:
		Node* head = nullptr;
		Node* tail = nullptr;
 
		bool isEmpty() {
			return head == nullptr && tail == nullptr;
		}
 
		void addFirst(string name, int id) {
			Node* n = new Node(name, id);
			if (isEmpty()) {
				head = tail = n;
			} else {
				n->next = head;
				head = n;
			}
		}
 
		void display() {
			if (isEmpty()) {
				cout << "is empty" << endl;
			} else {
				Node* cur = head;
				while (cur != nullptr) {
					cout << " (" << cur->data->id << "," << cur->data->name << ")";
					cur = cur->next;
				}
				cout << endl;
			}
		}
};
 
int main() {
	LinkedList* l1 = new LinkedList();
	l1->addFirst("vo", 1);
	l1->addFirst("vo1", 2);
	l1->addFirst("v2o", 3);
	l1->addFirst("v22o", 5);
	l1->display();
 
	return 0;
}
 