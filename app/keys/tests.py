from django.urls.exceptions import NoReverseMatch
from rest_framework.reverse import reverse
from loancalculator.tests import TestMixin
from rest_framework import status
from keys.models import Key
from django import test


class KeysListTest(test.TestCase, TestMixin):

    def setUp(self):
        TestMixin.setUp(self)
        self.url = reverse('keys:keys-list')

    def test_GET(self):
        """ Requires authentication. """
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.key1.url)
        self.assertContains(response, self.key2.url)

    def test_POST(self):
        """ Requires authentication. """
        data = {
            "title": "Pink Floyd",
            "url": "http://pink.com",
            "username": "Goodbye Blue Sky",
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['url'], data['url'])
        self.assertEqual(response.data['username'], data['username'])


class KeyDetailsTest(test.TestCase, TestMixin):

    def setUp(self):
        TestMixin.setUp(self)
        self.url = reverse('keys:keys-detail', args=[self.key1.id, ])

    def test_GET(self):
        """ Requires authentication. """
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.key1.url)
        self.assertNotContains(response, self.key2.url)

    def test_PUT(self):
        """ Requires authentication. """
        data = {
            "title": "Pink Floyd",
            "url": "http://pink.com",
            "username": "Goodbye Blue Sky",
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['url'], data['url'])
        self.assertEqual(response.data['username'], data['username'])

    def test_PATCH(self):
        """ Requires authentication. """
        data = {
            "title": "Pink Floyd",
            "url": "http://pink.com",
            "username": "Goodbye Blue Sky",
        }
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['url'], data['url'])
        self.assertEqual(response.data['username'], data['username'])

    def test_DELETE(self):
        """ Requires authentication. """
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Key.objects.filter(id=self.key1.id).count(), 0)
